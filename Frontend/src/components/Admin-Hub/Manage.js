import React,{useState,useEffect} from 'react'
import './CSS/manage.css'
import Header from './Header'
import Web3 from 'web3'
import {deviceToken} from '../deviceTokenABI'

function Manage() {
    let web3 = new Web3('http://127.0.0.1:8555')
    const contractAddr = '0x600DA82B3417F99997612f354E6C1D7e8616f9c3'
    const DeviceTokenContract = new web3.eth.Contract(deviceToken,contractAddr)

    const [totalDevices,setTotalDevices] = useState(0);
    const [loanedDevices, setLoanedDevices] = useState(0);
    const [overdue, setOverdue] = useState(0);
    const [deviceName, setDeviceName] = useState([]);
    const [ownerAddress, setOwnerAddress] = useState([]);

    useEffect(()=>{
        const getDevices = async () =>{
            const device = await DeviceTokenContract.methods.returnDeviceCount().call()
            return device
            
    
        }

        const getLoanedCount = async () =>{
            let count = 0;
            for(let i = 0; i< totalDevices; i++){
               const lDevice = await DeviceTokenContract.methods.devices(i).call()
               if(lDevice.loaned === true){
                   count++;
               }

            }

            return count
        }

        const getLoanedDeviceName = async () =>{

            let names = [];

            for(let i = 0; i< totalDevices; i++){
                const lDevice = await DeviceTokenContract.methods.devices(i).call()
                if(lDevice.loaned === true){
                    names.push(lDevice.deviceName);
                    
                }
 
             }

            return names;

        }

        
        


        getDevices()
        .then(total => setTotalDevices(total))

        
        getLoanedCount()
        .then(device => setLoanedDevices(device))

        getLoanedDeviceName()
        .then(names => setDeviceName(names))

        
        
        
        
    })
    

    return (
        <div className="manage">
            <Header page="Manage Devices" />
            <div className="device-container">
               <div className="total-devices">
                   <h1>{totalDevices}</h1>
                   <h2> Total Devices</h2>


               </div>
               <div className="loaned-devices">
                   <h1>{loanedDevices}</h1>
                   <h2> Loaned Devices</h2>

               </div>
               <div className="overdue-devices">
                   <h1>{overdue}</h1>
                   <h2>Overdue</h2>
               </div>
            </div> 
            <div className="owners">
                <h3> Current owners</h3>
                <ul className='DeviceName'>
                {deviceName.map(name => <li> {name}</li>)}
              </ul>
              
            </div>   
            
            
        </div>
    )
}

export default Manage
