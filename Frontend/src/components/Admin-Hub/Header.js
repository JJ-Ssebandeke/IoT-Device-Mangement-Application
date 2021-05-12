import React,{useEffect,useState} from 'react'
import './CSS/header.css'
import {Link} from 'react-router-dom';
import {RiDashboardLine} from 'react-icons/ri'
import {RiDeviceLine} from 'react-icons/ri'
import {AiOutlineTeam} from 'react-icons/ai'
import {FiServer} from 'react-icons/fi'
import Web3 from 'web3';



function Header(props) {

    const [peers, setPeers] = useState(0);

    useEffect(()=>{
        let web3 = new Web3('http://127.0.0.1:8555');
        let fetchPeers =  async () =>{
          const peerCount =  await web3.eth.net.getPeerCount();
          return peerCount;
        }
        fetchPeers()
        .then(p =>{
          setPeers(p);
        })
        })
    
    return (
        <div className="navigation">
            
            <div className="Side-Bar">
                
             <nav className="nav2">
                  <ul className= "nav-Items-SideBar">
                     <li>
                     <Link to="/" className="page-Icon"><RiDashboardLine  size={35} color={"rgba(200, 219, 248, 0.925)"}/></Link> 
                     </li>
                     <li>
                         <Link to="Dashboard" className="network-link"><FiServer size={32} /> Blockchain</Link> 
                     </li>
                     <li>
                         <Link to="Register" className="register-link"><RiDeviceLine size={35} /> Registration</Link>  
                     </li>
                     <li>
                         <Link to="Manage" className="manage-link"><AiOutlineTeam size={35} /> Mangement</Link>  
                     </li>
                  </ul>
             </nav>

            </div>
            <div className = 'top'>
                 <h2>{props.page}</h2>
              <nav>
                 <ul className= "nav-Items-Header">
                     <li> Network Peers: {peers} </li>
                 </ul>
             </nav> 

            </div>
           


        </div> 
        
       
        
    )
}

export default Header
