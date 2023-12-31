import { useState, useEffect } from "react";
import Debts from "../Debts";
import Month from "../Month";

const DebtCalculator = () => {
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

  useEffect(() => {
    loadSavedDebts();
  }, []);

  // DEBT HEADER
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const submitDebt = (debtTitle, event) => {
    event.preventDefault();
    if (debtTitle !== "") {
      setAndSaveDebts([
        ...debts,
        {
          id: crypto.randomUUID(),
          title: debtTitle,
          balance: 0,
          interestRate: 0,
          totalPayoffMonths: 0,
        },
      ]);
    }
    setTitle("");
  };

  // DEBT CONTAINER
  const setAndSaveDebts = (newDebts) => {
    setDebts(newDebts);
    localStorage.setItem("debts", JSON.stringify(newDebts));
  };

  const loadSavedDebts = () => {
    const saved = localStorage.getItem("debts");
    if (saved) {
      setDebts(JSON.parse(saved));
    }
  };

  // INDIVIDUAL DEBTS
  const deleteDebt = (debtId) => {
    const newDebts = debts.filter((debt) => debt.id !== debtId);
    setAndSaveDebts(newDebts);
  };

  const updateDebt = (
    debtId,
    balance,
    interestRate,
    event,
    monthsUntilPayoff
  ) => {
    event.preventDefault();
    const newDebts = debts.map((debt) => {
      if (debtId === debt.id) {
        return {
          ...debt,
          balance: balance,
          interestRate: interestRate,
          monthsUntilPayoff: monthsUntilPayoff,
        };
      }
      return debt;
    });
    setAndSaveDebts(newDebts);
  };

  // MONTH CONTAINER
  const drawMonths = (months) => {
    return months.map((month, i) => (
      <Month key={crypto.randomUUID()} month={month} monthNumber={i + 1} />
    ));
  };
  return (
    <div className="nes-container is-dark with-title debts-container">
      <p className="title">Debt Calculator</p>
      <header className="nes-container is-rounded is-dark header">
        <form
          onSubmit={(event) => submitDebt(title, event)}
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
            onClick={(event) => submitDebt(title, event)}
            type="button"
            className="nes-btn is-success"
          >
            Add
          </button>
        </form>
      </header>
      <div className="debts-header">
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
      <Debts debts={debts} deleteDebt={deleteDebt} updateDebt={updateDebt} />
      <div className="months-container">{drawMonths(months)}</div>
    </div>
  );
};

export default DebtCalculator;
