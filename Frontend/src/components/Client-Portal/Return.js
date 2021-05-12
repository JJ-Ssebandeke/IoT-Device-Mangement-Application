import React,{useState} from 'react'
import Web3 from 'web3'
import {deviceToken} from '../deviceTokenABI'
import './CSS/return.css'

function Return() {
    let web3 = new Web3(Web3.givenProvider)
    const contractAddr = '0x600DA82B3417F99997612f354E6C1D7e8616f9c3'
    const DeviceTokenContract = new web3.eth.Contract(deviceToken,contractAddr)

    const [address, setAddress] = useState()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const accounts = await window.ethereum.enable();
        const redeemDevice = await DeviceTokenContract.methods.redeemTokens(address).send({
            from:accounts[0] })
        console.log(redeemDevice)
    }
    
    return (
        <>
           <form className="returnDevice-form" onSubmit={handleSubmit}>
            <h2> Redeem Tokens</h2>
              <label>
                   <input type="text" name="Holder Address" placeholder="Token Holder Address" value={address} onChange={e => setAddress(e.target.value)}/>
               </label>
               <input type="submit" value="Submit"/>       
           </form>
        </>
    )
}

export default Return
