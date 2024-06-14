"use client";
import React, { useState } from "react";

enum trans_type {
  income,
  expense,
}

interface trans_interface {
  name: string;
  amount: string;
  type: trans_type | string;
}

const initial_val = {
  name: "",
  amount: "",
  type: "",
};

export default function Home() {
  const [allTrans, setAllTrans] = useState<trans_interface[]>([]);
  const [transData, setTransData] = useState(initial_val);
  const [currStatus, setCurrStatus] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let target: any = e.target;
    let keyName = target.name;
    let value = target.value;

    setTransData({
      ...transData,
      [keyName]: value,
      type: value > 0 ? "income" : "expense",
    });
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (transData.name && transData.amount) {
      const all_transactions = [...allTrans, transData];
      let curr_income = currStatus.income,
        curr_expense = currStatus.expense;
      if (transData.type == "income") {
        curr_income = all_transactions
          .filter((item) => item.type == "income")
          .reduce(
            (accumulator, currentValue: trans_interface) =>
              accumulator + parseInt(currentValue.amount),
            0
          );
      } else {
        curr_expense = all_transactions
          .filter((item) => item.type == "expense")
          .reduce(
            (accumulator, currentValue: trans_interface) =>
              accumulator + parseInt(currentValue.amount),
            0
          );
      }

      setCurrStatus({
        income: curr_income,
        expense: curr_expense,
        balance: curr_income - Math.abs(curr_expense),
      });
      setAllTrans(all_transactions);
      setTransData(initial_val);
    } else {
      alert("Please enter transaction name and amount!");
    }
  };

  return (
    <main className="flex justify-center items-center flex-col h-dvh ">
      <div className="w-96">
        <h3 className="text-4xl font-semibold text-center">Expense Tracker</h3>
        {/* <h5 className="uppercase text-sm mt-6"> your balance</h5>
        <h2 className="text-3xl">$350</h2> */}
        <div className="flex mt-6 mb-6 gap-1">
          <div className="flex flex-col itemse-center justify-center shadow-md p-4 shadow-gray-500 flex-1 text-center">
            <span className="uppercase font-semibold text-lg">income</span>
            <span className="text-2xl">{currStatus.income}</span>
          </div>
          <div className="flex flex-col itemse-center justify-center shadow-md p-4 shadow-gray-500 flex-1 text-center">
            <span className="uppercase font-semibold text-lg">expense</span>
            <span className="text-2xl">{currStatus.expense}</span>
          </div>
          <div className="flex flex-col itemse-center justify-center shadow-md p-4 shadow-gray-500 flex-1 text-center">
            <span className="uppercase font-semibold text-lg">balance</span>
            <span className="text-2xl">{currStatus.balance}</span>
          </div>
        </div>
        <div className="border-b border-gray-700 w-full pb-2">
          <span className="text-lg ">History</span>
        </div>
        <div className="max-h-72 overflow-y-scroll scroll-hidden">
          {allTrans.length ? (
            <div className="flex flex-col gap-3 mt-6">
              {allTrans.map((item, index) => {
                return (
                  <div
                    key={item.name}
                    className="shadow-md shadow-gray-700 px-3 cursor-pointer py-2 flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <span>{item.amount}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-2">
              <span className="text-sm pt-2">
                Transactions history will appear here
              </span>
            </div>
          )}
        </div>

        <div className="add-transaction mt-6">
          <div className="border-gray-700 w-full pb-2 border-b">
            <span className="text-lg pb-2 uppercase font-semibold">
              Add new transaction
            </span>
          </div>
          <form onSubmit={handleAddTransaction}>
            <div className="flex flex-col mt-6">
              <span>Transaction name</span>
              <input
                value={transData.name}
                className="bg-gray-800 p-2 mt-2 outline-none"
                type="text"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-6">
              <span>Amount</span>
              <span className="text-sm">
                (negative - expense, positive - income)
              </span>
              <input
                value={transData.amount}
                className="bg-gray-800 p-2 mt-2 outline-none"
                type="number"
                name="amount"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="uppercase bg-slate-400 w-full mt-6 p-2"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
