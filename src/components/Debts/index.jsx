import { useState, useEffect } from "react";
import Month from "../Month/index.jsx";
import Debt from "../Debt/index.jsx";

import "./Debts.css";

const Debts = () => {
  const [debts, setDebts] = useState([]);
  const [title, setTitle] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const totalMonths = 17;

  useEffect(() => {
    loadSavedDebts();
  }, []);

  const loadSavedDebts = () => {
    const saved = localStorage.getItem("debts");
    if (saved) {
      setDebts(JSON.parse(saved));
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onDebtSubmit = (debtTitle, event) => {
    event.preventDefault();
    if (debtTitle !== "") {
      setAndSaveDebts([
        ...debts,
        {
          id: crypto.randomUUID(),
          title: debtTitle,
          amount: 0,
          interestRate: 0,
        },
      ]);
    }
    setTitle("");
  };

  const setAndSaveDebts = (newDebts) => {
    setDebts(newDebts);
    localStorage.setItem("debts", JSON.stringify(newDebts));
  };

  const onDeleteDebt = (debtId) => {
    const newDebts = debts.filter((debt) => debt.id !== debtId);
    setAndSaveDebts(newDebts);
  };

  const updateDebt = (debtId, amount, interestRate, event) => {
    event.preventDefault();
    const newDebts = debts.map((debt) => {
      if (debtId === debt.id) {
        return { ...debt, amount: amount, interestRate: interestRate };
      }
      return debt;
    });
    setAndSaveDebts(newDebts);
    // setTotalBudgetAndSave(newCategories.reduce((a, c) => a + +c.budget, 0));
  };

  const drawMonths = (months) => {
    return months.map((month, i) => (
      <Month
        key={crypto.randomUUID()}
        month={month}
        monthNumber={i + 1}
        totalMonths={totalMonths}
      />
    ));
  };

  console.log(debts);

  return (
    <div className="nes-container is-dark with-title debts">
      <p className="title">Debt Calculator</p>
      <header className="nes-container is-rounded is-dark header">
        <form
          onSubmit={(event) => onDebtSubmit(title, event)}
          className="header-form"
        >
          <input
            className="nes-input header-input"
            type="text"
            placeholder="Add debt.."
            value={title}
            onChange={onChangeTitle}
          />
          <button
            onClick={(event) => onDebtSubmit(title, event)}
            type="button"
            className="nes-btn is-success"
          >
            Add
          </button>
        </form>
      </header>
      <div className="debt-header">
        <p className="debt-title">Debt</p>
        <div className="debt-form">
          <span>Balance</span>
          <span>Interest</span>
        </div>
        <button
          onClick={(event) => event.preventDefault()}
          className="nes-btn is-error invisible"
          readOnly
          tabIndex="-1"
        >
          DELETE
        </button>
      </div>
      {debts
        .sort((a, b) => b.amount - a.amount)
        .map((debt) => (
          <Debt
            key={crypto.randomUUID()}
            debt={debt}
            onDebtSubmit={onDebtSubmit}
            onDeleteDebt={onDeleteDebt}
            updateDebt={updateDebt}
          />
        ))}
      {/* Debt Payoff Heatmap */}
      <div className="square-container">{drawMonths(months)}</div>
    </div>
  );
};

export default Debts;
