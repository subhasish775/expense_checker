import {useState, useEffect} from 'react';
import styled from 'styled-components';
import OverviewComponent from './OverviewComponent';
import TransactionComponent from './TransactionComponent';
const Container = styled.div`
display:flex;
flex-direction:column;
margin:30px 0 10px;
font-family:Montserrat;
width:380px;`
const HomeComponent =(props)=>{
const [transaction,setTransaction]= useState([])
const [expense, setExpense] =useState(0)
const [income, setIncome] = useState(0);


  const addTransaction= (payload)=>{
  const transactionArray=[...transaction];
  transactionArray.push(payload)
  setTransaction(transactionArray);
  }
  const calculateBalance = ()=>{
      let inc=0;
      let exp= 0;
     
      transaction.map((payload)=>{
       payload.type==="EXPENSE" ? 
       (exp= exp+payload.amount):
       (inc = inc+payload.amount)
      
      });
      setExpense(exp);
      setIncome(inc);
      
  };
  

  useEffect(()=>{
    calculateBalance();
},[transaction])
  
    return ( 
    
    <Container>
    <OverviewComponent addTransaction={addTransaction} income={income} expense={expense}  />
    <TransactionComponent transaction ={transaction} />
    </Container>
    )
}

export default HomeComponent;