import React from 'react';
import CustomerTable from './components/CustomerTable/CustomerTable';
import '../src/App.css';
import TransactionGraph from './components/TransactionGraph/TransactionGraph';

export default function App() {
  return <>
    <div className='container mx-auto text-center mt-4 text-white'>
      <h1 className=''> <i className='fas fa-users fa-1xs'></i> Customers Transactions</h1>
      <CustomerTable />
      <TransactionGraph />
    </div>
  </>
}
