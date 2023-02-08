const path = require("path");

// module.exports = path.dirname(process.main.filename);
module.exports = path.dirname(require.main.filename);
