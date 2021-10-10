var NFTAirdrop = artifacts.require("./NFTAirdrop.sol");

module.exports = async function(deployer) {
  await deployer.deploy(NFTAirdrop);
};
