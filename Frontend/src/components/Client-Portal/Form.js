import React,{useState} from 'react'
import './CSS/Form.css'
import Loan from './Loan';
import Return from './Return';

function Form() {

    const [loanOpen,setLoanOpen]= useState(true);
    const [returnOpen,setReturnOpen] = useState(false);

    const showLoanForm = () =>{
        setLoanOpen(true);
        setReturnOpen(false);
    }

    const showReturnForm = () =>{
        setReturnOpen(true)
        setLoanOpen(false)
    }


    return (
      <div className="full-form">
          <div className="selection">
              <div onClick={showLoanForm} className="request-devices">
                 <h2> Request Devices</h2>  
              </div>
              <div onClick={showReturnForm} className="redeem-tokens">
                 <h2> Redeem Tokens</h2> 
              </div>
              
          </div>
         
         <div className="client-form">
             {loanOpen && <Loan />}
             {returnOpen && <Return />}
           
        </div>    
     </div>
    )
}

export default Form
