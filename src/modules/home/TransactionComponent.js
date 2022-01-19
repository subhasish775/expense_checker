import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
const Container= styled.div`
display:flex;
flex-direction:column;
align-items:center;
padding:10px 22px;
font-size:18px;
width:100%;
gap:10px;
align-items:flex-start;
font-weight:bold;
 & input{
     padding:10px 12px;
     border-radius:12px;
     background:#e6e8e9;
     border:1px solid #e6e8e9;
     outline:none;
     width:100%;
 }
`;
const Cell= styled.div`
display:flex;
flex-direction:row;
padding:10px 15px;
font-size:14px;
width:100%;
border-radius:2px;
font-weight:normal;
justify-content:space-between;
border:1px solid #e6e8e9;
border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const TransactionCell=(props)=>{
    console.log(props.paylaod.type)
    return (
        <Cell isExpense={props.payload?.type==="EXPENSE"}>
            <span>{props.paylaod.desc}</span>
            <span>{props.paylaod.amount}</span>
        </Cell>
    )
}
const TransactionComponent =(props)=>{
  const [filteredTransaction, updateTxn] =useState(props.transaction);
  const [searchText, updateText] = useState("")
  const filterData=()=>{
      if(!searchText || !searchText.trim().length){
          updateTxn(props.transaction);
          return ;
      }
      let txn = [...props.transaction]
       txn = txn.filter((payload)=>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
      )
      updateTxn(txn);
    
     
  }
  useEffect(()=>{
      filterData(searchText);
  },[props.transaction])
    return (
        <Container>Transaction
       <input placeholder="search" value={searchText} onChange={(e)=>{
           updateText(e.target.value);
           filterData(e.target.value)
       }}/>
       {filteredTransaction?.length ?
        filteredTransaction.map((payload)=>(<TransactionCell paylaod={payload} />) )
        : "No Transaction found"}
        </Container>
    )
}
export default TransactionComponent;