import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
display:flex;
flex-direction:column;
margin:10px;
font-family:Montserrat;
width:100%;
`;
const BalanceBox = styled.div`
display:flex;
width:100%;
font-weight:bold;
font-size:18px;
flex-direction:row;
justify-content:space-between;
align-items:center;
`;
const AddTransaction = styled.div`
background:black;
color:white;
padding:5px 10px;
font-weight:bold;
font-size:15px;
text-align:center;
border-radius:4px;
cursor:pointer;
`

const AddTransactionContainer = styled.div`
display:flex;
flex-direction:column;
border:1px solid #e6e8e9;
padding:15px;
width:100%;
gap:10px;
margin: 20px;
 & input {
     padding:10px 12px;
     border-radius:4px;
     border:1px solid #e6e8e9;
 }
`

const RadioBox = styled.div`
display:flex;
flex-direction:row;
width:100%;
align-items:center;
& input {
    width:unset;
    margin:0 10px;
}
`

const AddTransactionView =(props)=>{
const [amount, setAmount]= useState();
const [desc, setDesc]= useState("");
const [type, setType] = useState("EXPENSE")
const addTransaction =()=>{
 props.addTransaction({amount:Number(amount),desc,type,id:Date.now()})
  props.toggleTxnVisible()
}

return <AddTransactionContainer>
     <input placeholder="Amount" type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} /> 
     <input placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/> 
      <RadioBox>
       <input type="radio" id="expense" name="type" value="EXPENSE" checked={type==='EXPENSE'} onChange={(e)=>setType(e.target.value)}/>
       <label htmlFor="expense">Expenses</label>
       <input type="radio" id="income" name="type" value="INCOME" checked={type==='INCOME'} onChange={(e)=>setType(e.target.value)} />
       <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
</AddTransactionContainer>
}
 const ExpenseContainer =styled.div`
 display:flex;
 flex-direction:row;
 gap:12px;
 margin:20px;
 `;
 const ExpenseBox= styled.div`
 display:flex;
 flex-direction:column;
 border:1px solid #e6e8e9;
 border-radius:4px;
 padding:15px 20px;
 width:135px;
 font-size:14px;
 & span {
     font-size:20px;
     font-weight:bold;
     color:${(props) => (props.isIncome ? "green" : 'red' )}
 }
 `




const OverviewComponent =(props)=>{
    const [isAddTxnVisible, toggleTxnVisible] = useState(true);
    return (
        <Container>
        <BalanceBox>
          Balance: ${props.income- props.expense}
          <AddTransaction onClick={()=>toggleTxnVisible(!isAddTxnVisible)}>
              {isAddTxnVisible ? "cancel" : "ADD"}
              </AddTransaction> 
              </BalanceBox>
          {isAddTxnVisible && <AddTransactionView toggleTxnVisible={toggleTxnVisible} addTransaction={props.addTransaction}/> }
          <ExpenseContainer>
         <ExpenseBox isIncome={false}>
         {/* isIncome is a property here so it's using in CSS dynamically  */}
             Expense<span>${props.expense}</span>
         </ExpenseBox>
         <ExpenseBox isIncome={true}>
             Income<span>${props.income}</span>
         </ExpenseBox>
          </ExpenseContainer>

   </Container>
    )
}
export default OverviewComponent;