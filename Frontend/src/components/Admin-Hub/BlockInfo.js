import React,{useState,useEffect} from 'react'
import './CSS/Blockinfo.css'
import NavBar from './NavBar';
import Header from './Header';
import Web3 from 'web3';

function BlockInfo() {
    const [lastBlocks, setLastBlocks] = useState([]);
    const [hash, setHash] = useState([]);
    const [gas, setGas] =  useState([]);
    const [transctions, setTransactions] = useState([]);
    const [tx,setTx] = useState([]);
   
    useEffect(()=>{

        let web3 = new Web3('http://127.0.0.1:8555');
   
        let getBlocks = async () => {
      
          let newBlock;
          let tenBlocks = [];
      
          for( let i = 0; i< 10; i++){
              let currentBlock = await web3.eth.getBlock('latest');
              newBlock = await web3.eth.getBlock(currentBlock.number - i);
              tenBlocks.push(newBlock);
              
          }
      
          return tenBlocks
        }

        let trans = async () =>{
         let trblk = await web3.eth.getBlock('latest')
         let transArray = []
         for (let i = 0; i < trblk.transactions.length; i++) {
          if(i === 6){
            break;
          }
          let input = await web3.eth.getTransactionReceipt(trblk.transactions[i]);
          transArray.push(input)
         }
         return transArray
        }
    
        getBlocks()
        .then( b => {
          setLastBlocks(b.map(blocks => blocks.number))
          setHash(b.map(b => b.hash.substring(0,50)))
          setTransactions(b.map(x=> x.transactions.length))
          
          
        })

        trans()
        .then(t=>{
           setGas(t.map(tx=>tx.gasUsed))
           setTx(t.map(tx=>tx.transactionHash.substring(0,28)))

        })
    
      },[])

      //console.log(currentInfo);
     
    return (
        
    <div className="Full-Page">
       <Header page="Network Dashboard" />
           
        <div className="displayPannel-1">

          <div className= "card-1">
             <h3> Latest Blocks</h3>

             <div className= "block-data">
               <ul className='blockList'>
                  <p> Block Number</p>
                  {lastBlocks.map(b => <li> {b} </li>)} 
               </ul>
               <ul className='hashList'>
                  <p className="hash-title"> Hash</p>
                  {hash.map(b => <li> {b}... </li>)} 
               </ul>
               <ul className='transaction-count'>
                  <p> Transctions</p>
                  {transctions.map(b => <li> {b} </li>)} 
               </ul>
             </div>
          </div>
          <NavBar />
        </div>
        <div className="displayPannel-2">
            <h3>Lastest Transtactions</h3>
            
            <div className="transactions">
              <ul className='gasList'>
                {gas.map(gas => <li> Gas Used: {gas}</li>)}
              </ul>
              <ul className='txHash-List'>
                {tx.map(transaction => <li> transaction Hash: {transaction}...</li>)}
              </ul>
                   
             
            </div>
        </div>

    </div>
    )

}

export default BlockInfo
