import React, {useState} from 'react'
import './CSS/register.css'
import Header from './Header'
import Web3 from 'web3';
import {deviceToken} from '../deviceTokenABI'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Register() {
    let web3 = new Web3('http://127.0.0.1:8555')
    const contractAddr = '0x600DA82B3417F99997612f354E6C1D7e8616f9c3'
    const DeviceTokenContract = new web3.eth.Contract(deviceToken,contractAddr)
    
    
    const [name, setName] = useState()
    const [address, setAddress] = useState()

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const addDevice =  await DeviceTokenContract.methods.addDevice(name,address).send({
             from: '0xf86C350d4C9A8c175618077BaC24709cB927F258', 
            });

        console.log(addDevice)



    }


    return (
        <div className="register-form">
          <Header page="Register Devices"/>

         <div className="addDevice-form-Container">
           <form className="addDevice-form" onSubmit={handleSubmit}>
               <h2> Add Devices</h2>
               <label >
                   <input  type="text" name="Name" placeholder="Name"  value={name} onChange={e => setName(e.target.value)} />
               </label>
               <label>
                   <input type="text" name="Device address" placeholder= "Device Address" value={address} onChange={e => setAddress(e.target.value)}></input> 
               </label>
               <input type="submit" value="Submit"/>
           </form>
           <Loader type="ThreeDots" height={170} color="grey" visible="false" />   
        </div> 
        
     </div>
    )
}

export default Register
