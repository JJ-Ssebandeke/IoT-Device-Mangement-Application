import React,{useState} from 'react'
import Web3 from 'web3'
import {deviceToken} from '../deviceTokenABI'
import './CSS/loan.css'

function Loan() {
    
    let web3 = new Web3(Web3.givenProvider)
    const contractAddr = '0x600DA82B3417F99997612f354E6C1D7e8616f9c3'
    const DeviceTokenContract = new web3.eth.Contract(deviceToken,contractAddr)

    const [address, setAddress] = useState()
    const [devices, setDevices] = useState()
    const [duration, setDuration] = useState()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const accounts = await window.ethereum.enable();
        const loanDevice = await DeviceTokenContract.methods.loanToken(devices,address,duration).send({
            from:accounts[0],
            value: devices*web3.utils.toWei('0.005','ether')})
        console.log(loanDevice)
    }

   
  
    return (
        <>
           <form className="loanDevice-form" onSubmit={handleSubmit}>
              <h2> Request Devices</h2>
              <label>
                   <input type="text" name="Requested Address" placeholder="Requested address" value={address} onChange={e => setAddress(e.target.value)}></input>
               </label>
               <label>
                    <input type="text" name="Devices" placeholder="Number of Devices" value={devices} onChange={e => setDevices(e.target.value)}/>
               </label>
               <label>
                    <input type="text" name="Duration" placeholder="Duration In Hours" value={duration} onChange={e => setDuration(e.target.value)}/>
               </label>
               <input type="submit" value="Submit"/>       
           </form>
        </>
    )
}

export default Loan
