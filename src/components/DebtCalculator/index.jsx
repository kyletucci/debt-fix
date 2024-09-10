import { useState, useEffect } from "react";
import Debts from "../Debts";
import Month from "../Month";

const DebtCalculator = ({
  debtCategories,
  setDebtCategories,
  setTotalDebts,
  monthsUntilPayoff,
  setMonthsUntilPayoff,
  disposableIncome,
  saveToLocalStorage,
  payoffMethod,
}) => {
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
    saveToLocalStorage("debt_categories", debtCategories);
  }, [debtCategories]);

  useEffect(() => {
    saveToLocalStorage("months_until_payoff", monthsUntilPayoff);
  });
  useEffect(() => {
    setMonthsUntilPayoff(
      debtCategories
        .map((debt) => parseFloat(debt.monthsUntilPayoff))
        .reduce((a, c) => a + c)
    );
  }, [disposableIncome, debtCategories]);

  useEffect(() => {
    drawMonths(months);
  }, [monthsUntilPayoff]);

  // DEBT HEADER
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const submitDebt = (debtTitle, event) => {
    event.preventDefault();
    if (debtTitle !== "") {
      setDebtCategories([
        ...debtCategories,
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
    const newDebts = debtCategories.filter((debt) => debt.id !== debtId);
    setDebtCategories(newDebts);
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
    const newDebts = debtCategories.map((debt) => {
      if (debtId === debt.id) {
        return {
          ...debt,
          balance: balance,
          minimum: minimum,
          interestRate: interestRate,
          monthsUntilPayoff: Number(monthsUntilPayoff).toFixed(2),
        };
      }
      return debt;
    });
    setDebtCategories(newDebts);
    setAndSaveTotalDebts(newDebts);
    setMonthsUntilPayoff(
      debtCategories
        .map((debt) => parseFloat(debt.monthsUntilPayoff))
        .reduce((a, c) => a + c)
    );
  };

  const drawMonths = (months) => {
    return months.map((month, i) => (
      <Month
        key={i}
        month={month}
        monthNumber={i + 1}
        monthsUntilPayoff={monthsUntilPayoff}
      />
    ));
  };

  return (
    <>
      <div className="nes-container is-dark with-title debt-calculator">
        <p className="title">Debts</p>

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
          <div className="debt-input-title">
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
          debtCategories={debtCategories}
          payoffMethod={payoffMethod}
          setDebtCategories={setDebtCategories}
        />
        <div className="months-container">{drawMonths(months)}</div>
      </div>
    </>
  );
};

export default DebtCalculator;
