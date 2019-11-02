const User = require("../components/users/userModel");

function magic(...models) {
  models.forEach((model) => {
    console.log(`${model.name} magic`, Object.keys(model.prototype));
  });
}

module.exports = () => magic(User);
