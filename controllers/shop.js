const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        products: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([[product]]) => {
      console.log("product", product);
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        products: rows,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const productsToCart = products.reduce((cartProducts, product) => {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }

        return cartProducts;
      }, []);

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: productsToCart,
      });
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
