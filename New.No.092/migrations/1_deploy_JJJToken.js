const JJJToken = artifacts.require("JJJToken");

module.exports = function (deployer) {
  deployer.deploy(JJJToken, "JJJToken", "JJJ", 1000);
};
