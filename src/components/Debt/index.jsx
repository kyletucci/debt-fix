import { useState } from "react";

const Debt = ({ debt, onDeleteDebt, updateDebt, disposableIncome }) => {
  const [formValues, setFormValues] = useState({
    balance: debt.balance,
    interestRate: debt.interestRate,
  });

  const [monthsUntilPayoff, setMonthsUntilPayoff] = useState(
    debt.balance / disposableIncome
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMonthsUntilPayoff(debt.balance / disposableIncome);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.activeElement.blur();
      updateDebt(
        debt.id,
        formValues.balance,
        formValues.interestRate,
        e,
        monthsUntilPayoff
      );
    }
  };

  return (
    <div className="nes-container is-rounded is-dark debt">
      <p className="debt-title">{debt.title}</p>
      <form className="debt-form">
        <label htmlFor="debtInput">$</label>
        <input
          className="nes-input debt"
          name="balance"
          type="text"
          placeholder="0.00"
          value={formValues.balance}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <input
          className="nes-input interest"
          name="interestRate"
          type="text"
          placeholder="0.00"
          value={formValues.interestRate}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
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
};

export default Debt;
