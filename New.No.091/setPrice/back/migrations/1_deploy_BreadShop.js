const BreadShop = artifacts.require("BreadShop");

module.exports = function (deployer) {
  deployer.deploy(BreadShop, (10 ** 18).toString());
};
