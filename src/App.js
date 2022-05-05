import React, { useEffect, useState } from 'react';
import './App.css';
import ExpenseList from './componets/ExpenseList';
import ErningList from './componets/ErningList';
import ExpenseForm from './componets/ExpenseForm';
import Wallet from './componets/wallet';
import Alert from './componets/Alert';
import { v4 as uuidv4 } from 'uuid';

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
const initialErnings = localStorage.getItem('ernings') ? JSON.parse(localStorage.getItem('ernings')) : []

function App() {
  //*****************state values ***********************/
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState('');
  //single amount
  const [amount, setAmount] = useState('');
  //alert
  const [alert, setAlert] = useState({ show: false })
  //edit
  const [edit, setEdit] = useState(false)
  //edit item
  const [id, setId] = useState(0)
  //***************** useEfect ***********************/
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses]);



  //************** Wallet**********/
  // all ernings, add ernings
  const [ernings, setErnings] = useState(initialErnings);

  const [walletCharge, setWalletCharge] = useState('');
  //single amount
  const [walletAmount, setWalletAmount] = useState('');


  useEffect(() => {
    localStorage.setItem('ernings', JSON.stringify(ernings))
  }, [ernings]);

  //***************** functionality ***********************/
  const handleCharge = e => {
    setCharge(e.target.value)
  };

  const handleAmount = e => {
    setAmount(e.target.value)
  };

  const handleWalletCharge = e => {
    setWalletCharge(e.target.value)
  };

  const handleWalletAmount = e => {
    setWalletAmount(e.target.value)
  };
  //handleAlert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(tempExpenses)
        setEdit(false)
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: "item added" })
      }
      setAmount("");
      setCharge("");
    } else {
      handleAlert({ type: 'danger', text: `spend more than you earn` })
    }


  };
  //handle walletsubmit
  const handleWalletSubmit = e => {
    e.preventDefault();
    if (walletCharge !== "" && walletAmount > 0) {
      if (edit) {
        let tempErnings = ernings.map(item => {
          return item.id === id ? { ...item, walletCharge, walletAmount } : item
        })
        setErnings(tempErnings)
        setEdit(false)
      } else {
        const singleErning = { id: uuidv4(), walletCharge, walletAmount };
        setErnings([...ernings, singleErning]);
        handleAlert({ type: 'success', text: "item added" })
      }
      setWalletAmount("");
      setWalletCharge("");
    } else {
      handleAlert({ type: 'danger', text: `charge can't be empty value and amount value has to be bigger than zero` })
    }

  };

  //clear all items 
  const clearItems = () => {
    setExpenses([]);
    setErnings([]);
    handleAlert({ type: "danger", text: "all item deleted" })
  };
  //handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    let tempErnings = ernings.filter(item => item.id !== id);
    setErnings(tempErnings);
    handleAlert({ type: "danger", text: "item deleted" })

  };


  //handle Edit
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let { charge, amount } = expense;

    setCharge(charge);

    setAmount(amount);
    setEdit(true);
    setId(id)
  };

  //handle wallet Edit
  const handleWalletEdit = (id) => {
    let erning = ernings.find(item => item.id === id)
    let { walletCharge, walletAmount } = erning;
    setWalletAmount(walletAmount);
    setWalletCharge(walletCharge);
    setEdit(true);
    setId(id)
  };

  const totalSpending = expenses.reduce((acc, curr) => {
    return (acc += parseInt(curr.amount));
  }, 0)

  const allEarned = ernings.reduce((acc, curr) => {
    return (acc += parseInt(curr.walletAmount));
  }, 0);

  const finalBill = allEarned - totalSpending;


  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget calculator</h1>
      <main className='App'>
        <Wallet
          walletCharge={walletCharge}
          walletAmount={walletAmount}
          handleWalletAmount={handleWalletAmount}
          handleWalletCharge={handleWalletCharge}
          handleWalletSubmit={handleWalletSubmit}
          edit={edit}
        />
        <ErningList
          ernings={ernings}
          handleDelete={handleDelete}
          handleEdit={handleWalletEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        all earned : {" "}
        <span className='total'>
          $
          {allEarned}
        </span>
      </h1>
      <br></br>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending : {" "}
        <span className='total'>
          $
          {totalSpending}
        </span>
      </h1>


      <h1>
        final bill : {""}
        <span className='total'>
          ${finalBill}
        </span>
      </h1>
    </>
  );
}

export default App;
