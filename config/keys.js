// module.exports = {
//   mongoURI:
//     "mongodb+srv://shady:shandra@devhub-bordi.mongodb.net/test?retryWrites=true&w=majority",
//   secretOrKey: "secret"
// };
// module.exports = {
//   mongoURI:
//     "mongodb+srv://shady:shandra@devconnector-vunth.mongodb.net/test?retryWrites=true&w=majority",
//   secretOrKey: "secret"
// };

if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
