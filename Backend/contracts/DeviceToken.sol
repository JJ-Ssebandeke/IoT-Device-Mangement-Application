// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract DeviceToken is ERC721,IERC721Receiver {

    uint256 public tokenCounter;
    uint256 private DEPOSIT_FEE;
    uint256 private  LATE_FEE;
    address private admin;
    
    event DeviceAdded(address _newDevice, string _name);
    event DevicesLoaned(address _to, uint numberOfDevices, uint date);
    event PaymentCollected(uint _value);
    event TokenRedeemed(address _holder, uint _Id, uint amountSent);
  
    struct Device {

        string  deviceName;
        address deviceAddress;
        address deviceOwner;
        uint collateral;
        uint tokenId;
        bool loaned;
        uint loanPeriod;
            
    }

     Device[] public devices;
    

    constructor() ERC721("deviceToken", "DEV") public payable {
        tokenCounter = 0;
        DEPOSIT_FEE = 0.005 ether;
        LATE_FEE = 0.002 ether;
        admin = msg.sender;
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external virtual override returns (bytes4){
        return this.onERC721Received.selector;
    }

    function addDevice(string memory _newName, address _NewAddress) public {
        
        uint eth = 0;
        uint newId = 0;
        bool status = false;
        Device memory newDevice = Device( _newName,_NewAddress,admin, eth, newId, status ,0);
        devices.push(newDevice);
        emit DeviceAdded(newDevice.deviceAddress,newDevice.deviceName);

    }


    function setDeviceSatus(Device storage _d, bool isLoaned ,uint ethValue, address newOwner , uint newId,  uint duration) internal  {

        _d.loaned = isLoaned;
        _d.collateral = ethValue;
        _d.deviceOwner = newOwner;
        _d.tokenId = newId;
        _d.loanPeriod = duration;


    }
    
    function returnDeviceCount() public view returns(uint count){
        return devices.length;
    }

    function loanToken(uint _devices, address requestedAddress, uint _duration) payable public {
        
        require(requestedAddress == msg.sender);
        require(balanceOf(requestedAddress) < devices.length, "All devices have been loaned");
        uint _amount = DEPOSIT_FEE *_devices;
        
        require(msg.value >= _amount, "not enough money sent");
        emit PaymentCollected(_amount);
        
        uint loanDuartion = block.timestamp + (_duration*3600);

        for(uint8 i = 0; i < _devices; i++) {
            

            for(uint8 j = 0; j < devices.length ; j++){

               Device storage requestedDevice = devices[j];

               if(!(requestedDevice.loaned)){
                   
                   tokenCounter++;
                   uint _id = tokenCounter;
                  _safeMint(msg.sender,_id);
                   setDeviceSatus(requestedDevice, true ,DEPOSIT_FEE , requestedAddress, _id, loanDuartion);
                   safeTransferFrom(ownerOf(_id), requestedAddress, _id);
                   
                   break;

               }         

            }

            
        }
        
        emit DevicesLoaned(requestedAddress, _devices, block.timestamp);

        
    }

    function redeemTokens(address payable tokenHolder) public {
       
       uint tokenCount = balanceOf(tokenHolder);
    

        for(uint8 i = 0; i < tokenCount; i++){

            for(uint8 j = 0; j < devices.length; j++){

                Device storage returnedDevice = devices[j];

                if(returnedDevice.deviceOwner == tokenHolder && returnedDevice.loanPeriod >= block.timestamp){
                    
                    emit TokenRedeemed(tokenHolder,returnedDevice.tokenId, returnedDevice.collateral);
                   _burn(returnedDevice.tokenId); 
                   tokenHolder.transfer(returnedDevice.collateral);
                   setDeviceSatus(returnedDevice, false, 0, admin, 0,0);                 
                   break;

               }
               if(returnedDevice.deviceOwner == tokenHolder && block.timestamp >= (returnedDevice.loanPeriod+ 3600)){
                   
                   uint penalty = returnedDevice.collateral - LATE_FEE;
                   emit TokenRedeemed(tokenHolder,returnedDevice.tokenId, penalty);
                   _burn(returnedDevice.tokenId); 
                   tokenHolder.transfer((penalty));
                   setDeviceSatus(returnedDevice, false, 0, admin, 0,0);
                   break;
                   
               }

            }

        }
        

    }

      
} 

