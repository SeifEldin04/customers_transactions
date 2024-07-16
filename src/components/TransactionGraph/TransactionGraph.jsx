import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Data from '../../db.json';

const TransactionGraph = () => {
    const [customers, setCustomers] = useState([])
    const [transactions, setTransactions] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setCustomers(Data.customers);
            setTransactions(Data.transactions);
        };
        fetchData();
    }, []);

    const handleCustomerSelect = (e) => {
        setSelectedCustomerId(parseInt(e.target.value));
    };

    const data = selectedCustomerId
        ? transactions
            .filter((transaction) => transaction.customer_id === selectedCustomerId)
            .reduce((acc, transaction) => {
                const existingEntry = acc.find((entry) => entry.date === transaction.date);
                if (existingEntry) {
                    existingEntry.totalAmount += transaction.amount;
                } else {
                    acc.push({ date: transaction.date, totalAmount: transaction.amount });
                }
                return acc;
            }, [])
        : transactions.reduce((acc, transaction) => {
            const existingEntry = acc.find((entry) => entry.date === transaction.date);
            if (existingEntry) {
                existingEntry.totalAmount += transaction.amount;
            } else {
                acc.push({ date: transaction.date, totalAmount: transaction.amount });
            }
            return acc;
        }, []);

    return (
        <div className='mx-auto text-center my-5'>
            <select onChange={handleCustomerSelect} className='form-control mb-3'>
                <option value="">All Customers</option>
                {transactions.map((transaction) => (
                    <option key={transaction.customer_id} value={transaction.customer_id}>
                        {customers.find((customer) => customer.id === transaction.customer_id)?.name}
                    </option>
                ))}
            </select>
            <div className='graph'>
                <LineChart width={800} height={400} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default TransactionGraph;