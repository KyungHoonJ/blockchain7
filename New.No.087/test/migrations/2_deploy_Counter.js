const counter = artifacts.require("Counter");

module.exports = function (deployer) {
  deployer.deploy(counter);
};
