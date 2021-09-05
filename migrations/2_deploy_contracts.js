var ProductBuy = artifacts.require("./ProductBuy.sol");
var TestToken = artifacts.require("./TestToken.sol");

module.exports = async function(deployer) {
  console.log(deployer);
  await deployer.deploy(TestToken, "1000000000000000000000000");
  await deployer.deploy(ProductBuy, TestToken.address, 5);
};
