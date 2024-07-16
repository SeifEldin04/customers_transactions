import React, { useEffect, useState } from 'react';
import Data from '../../db.json';

const CustomerTable = () => {

    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterBy, setfilterBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [amountSortDirection, setAmountSortDirection] = useState('asc');
    const [dateSortDirection, setDateSortDirection] = useState('asc');

    useEffect(() => {

        const fetchData = () => {
            setCustomers(Data.customers);
            setTransactions(Data.transactions);
            setFilteredTransactions(Data.transactions);
        };

        fetchData();

    }, []);


    const handleFilter = (e) => {
        setfilterBy(e.target.value);

        const filtered = transactions.filter((transaction) => {
            const customerName = customers.find((customer) => customer.id === transaction.customer_id)?.name;

            return customerName?.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredTransactions(filtered);
    }

    const handleSortByName = () => {
        const sorted = [...filteredTransactions].sort((a, b) => {
            const customerA = customers.find((customer) => customer.id === a.customer_id)?.name.toLowerCase();
            const customerB = customers.find((customer) => customer.id === b.customer_id)?.name.toLowerCase();

            if (sortDirection === 'asc') {
                return customerA > customerB ? 1 : -1;
            } else {
                return customerA < customerB ? 1 : -1;
            }
        });

        setFilteredTransactions(sorted);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }

    const handleSortByAmount = () => {
        const sorted = [...filteredTransactions].sort((a, b) => {
            if (amountSortDirection === 'asc') {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });

        setFilteredTransactions(sorted);
        setAmountSortDirection(amountSortDirection === 'asc' ? 'desc' : 'asc');
    }

    const handleSortByDate = () => {
        const sorted = [...filteredTransactions].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (dateSortDirection === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setFilteredTransactions(sorted);
        setDateSortDirection(dateSortDirection === 'asc' ? 'desc' : 'asc');
    }

    return <>
        <div className='text-center m-auto my-5'>
            <input type="text" placeholder='Filter by Customer name..' className='form-control my-3' onChange={handleFilter} value={filterBy} />

            <div className="d-flex justify-content-evenly">
                <button
                    className="btn bg-white text-dark w-25 mb-3 fw-bolder rounded-5"
                    onClick={handleSortByName}
                >
                    Sort by names ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
                </button>

                <button
                    className="btn bg-white text-dark w-25 mb-3 fw-bolder rounded-5"
                    onClick={handleSortByAmount}
                >
                    Sort by amount ({amountSortDirection === 'asc' ? 'Ascending' : 'Descending'})
                </button>

                <button
                    className="btn bg-white text-dark w-25 mb-3 fw-bolder rounded-5"
                    onClick={handleSortByDate}
                >
                    Sort by date ({dateSortDirection === 'asc' ? 'Ascending' : 'Descending'})
                </button>
            </div>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTransactions.map((transaction) => {
                        const customerName = customers.find((customer) => customer.id === transaction.customer_id)?.name;

                        return (
                            <tr key={transaction.id}>
                                <td>{customerName}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
}

export default CustomerTable;
