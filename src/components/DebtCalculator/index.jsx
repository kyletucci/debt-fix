import { useState, useEffect } from "react";
import Debts from "../Debts";
import Month from "../Month";
import DebtSummary from "../DebtSummary";

const DebtCalculator = ({ disposableIncome }) => {
  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem("debts");
    if (saved == null) return [];
    return JSON.parse(saved);
  });

  const [title, setTitle] = useState("");

  const [totalDebts, setTotalDebts] = useState(() => {
    const saved = localStorage.getItem("totalDebts");
    if (saved == null) return "";
    return JSON.parse(saved);
  });

  const [monthsUntilPayoff, setMonthsUntilPayoff] = useState(() => {
    const saved = localStorage.getItem("monthsUntilPayoff");
    if (saved == null) return "";
    return JSON.parse(saved);
  });

  const [payoffMethod, setPayoffMethod] = useState(() => {
    const saved = localStorage.getItem("payoffMethod");
    if (saved == null) return "";
    return JSON.parse(saved);
  });

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
    localStorage.setItem("debts", JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem("payoffMethod", JSON.stringify(payoffMethod));
  }, [payoffMethod]);

  useEffect(() => {
    localStorage.setItem("totalDebts", JSON.stringify(totalDebts));
  }, [totalDebts]);

  useEffect(() => {
    localStorage.setItem(
      "monthsUntilPayoff",
      JSON.stringify(monthsUntilPayoff)
    );
  }, [monthsUntilPayoff, disposableIncome]);

  useEffect(() => {
    drawMonths(months);
  }, [monthsUntilPayoff]);

  const handleMethodChange = (e) => {
    setPayoffMethod(e.target.value);
  };

  const sortedDebts =
    payoffMethod === "snowball"
      ? debts.sort((a, b) => a.balance - b.balance)
      : debts.sort((a, b) => b.interestRate - a.interestRate);

  // DEBT HEADER
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const submitDebt = (debtTitle, event) => {
    event.preventDefault();
    if (debtTitle !== "") {
      setDebts([
        ...debts,
        {
          id: crypto.randomUUID(),
          title: debtTitle,
          balance: 0,
          minimum: 0,
          interestRate: 0,
        },
      ]);
    }
    setTitle("");
  };

  //TOTAL DEBT
  const setAndSaveTotalDebts = (newDebts) => {
    const newDebtTotal = newDebts
      .map((debt) => debt.balance)
      .reduce((a, c) => +a + +c);
    setTotalDebts(newDebtTotal);
  };

  // INDIVIDUAL DEBTS
  const deleteDebt = (debtId) => {
    const newDebts = debts.filter((debt) => debt.id !== debtId);
    setDebts(newDebts);
  };

  const updateDebt = (
    debtId,
    balance,
    minimum,
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
          minimum: minimum,
          interestRate: interestRate,
          monthsUntilPayoff: monthsUntilPayoff,
        };
      }
      return debt;
    });
    setDebts(newDebts);
    setAndSaveTotalDebts(newDebts);
    setMonthsUntilPayoff(
      newDebts
        .reduce((a, c) => +a.monthsUntilPayoff + +c.monthsUntilPayoff)
        .toFixed(2)
    );
    drawMonths(months);
  };

  const drawMonths = (months) => {
    return months.map((month, i) => (
      <Month
        key={crypto.randomUUID()}
        month={month}
        monthNumber={i + 1}
        monthsUntilPayoff={monthsUntilPayoff}
      />
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
          <div className="minimum">
            <span>Minimum</span>
            <span>Monthly</span>
            <span>Payment</span>
          </div>
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
      <Debts
        deleteDebt={deleteDebt}
        updateDebt={updateDebt}
        disposableIncome={disposableIncome}
        debts={debts}
      />
      <div className="months-container">{drawMonths(months)}</div>
      <DebtSummary
        disposableIncome={disposableIncome}
        totalDebts={totalDebts}
        monthsUntilPayoff={monthsUntilPayoff}
        sortedDebts={sortedDebts}
        handleMethodChange={handleMethodChange}
        payoffMethod={payoffMethod}
      />
    </div>
  );
};

export default DebtCalculator;
