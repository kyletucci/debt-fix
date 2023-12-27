import { useState } from "react";
import Month from "../Month/index.jsx";

import "./Debts.css";

const Debts = () => {
  const [title, setTitle] = useState("");
  const [debts, setDebts] = useState([]);

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

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onDebtSubmit = (title, event) => {
    event.preventDefault();
    setDebts([...debts, { id: crypto.randomUUID(), title: title }]);
    setTitle("");
  };

  const onDeleteDebt = (debtId) => {
    const newDebts = debts.filter((debt) => debt.id !== debtId);
    setDebts(newDebts);
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
      <div key={crypto.randomUUID()} className="debt-container">
        {debts.map((debt) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="nes-container is-rounded is-dark debt"
            >
              <p className="debt-title">{debt.title}</p>
              <form className="debt-form">
                <label htmlFor="debtInput">$</label>
                <input
                  className="nes-input debt"
                  name="debtInput"
                  type="text"
                  placeholder="0.00"
                />
                <input
                  className="nes-input interest"
                  name="interestInput"
                  type="text"
                  placeholder="0.00"
                />
                <label htmlFor="interestInput">%</label>
              </form>
              <button
                onClick={() => onDeleteDebt(debt.id)}
                className="nes-btn is-error"
                readOnly
                tabIndex="-1"
              >
                DELETE
              </button>
            </div>
          );
        })}
        {/* Debt Payoff Heatmap */}
        <div className="square-container">{drawMonths(months)}</div>
      </div>
    </div>
  );
};

export default Debts;
