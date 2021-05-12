import React, {useEffect,useState} from 'react'
import './CSS/navBar.css';
import Web3 from 'web3';

function NavBar(){
    
  const [currentBlock, setCurrentBlock] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  
  let web3 = new Web3('http://127.0.0.1:8555');

  useEffect(()=>{

    let fetchBlockData = async () =>{
      const latestBlock =  await web3.eth.getBlock('latest');
      return latestBlock;
    }
  

    fetchBlockData()
    .then(block =>{
       setCurrentBlock(block.number);
       setTimeStamp(block.timestamp);

    })

  })
  
  let date = new Date(timeStamp * 1000).toUTCString();

    return (
        <div className= 'navBar'>
            <nav>
              <ul className= "nav-Items">
                 <li> Latest Block: {currentBlock} </li>
                 <li> Time stamp: {date}</li>
              </ul>
            </nav>    
        </div>
    )
}

export default NavBar;

