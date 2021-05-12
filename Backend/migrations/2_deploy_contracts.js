var DeviceTokenContract = artifacts.require("DeviceToken") 

module.exports = function (deployer) {
    deployer.deploy(DeviceTokenContract);
  };
  