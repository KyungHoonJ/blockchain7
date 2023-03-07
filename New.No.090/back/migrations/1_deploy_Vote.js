const Vote = artifacts.require("Vote");

module.exports = function (deployer) {
  deployer.deploy(Vote, ["핵밥", "냉면", "닭가슴살", "단식"]);
};
