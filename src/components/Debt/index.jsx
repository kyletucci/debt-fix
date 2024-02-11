import { useState } from "react";

const Debt = ({ debt, deleteDebt, updateDebt, disposableIncome }) => {
  const [formValues, setFormValues] = useState({
    balance: debt.balance,
    minimum: debt.minimum,
    interestRate: debt.interestRate,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleKeyPress = (e) => {
    const payoffMonths = formValues.balance / disposableIncome;
    const annualInterest = formValues.balance * (formValues.interestRate / 100);
    const interestAccrued = annualInterest * (payoffMonths / 12);
    const newBalance = +formValues.balance + +interestAccrued;
    const newPayoffMonths = newBalance / disposableIncome;
    if (e.key === "Enter") {
      e.preventDefault();
      document.activeElement.blur();
      updateDebt(
        debt.id,
        formValues.balance,
        formValues.minimum,
        formValues.interestRate,
        e,
        newPayoffMonths.toFixed(2)
      );
    }
  };

  return (
    <div className="nes-container is-rounded is-dark debt-container">
      <p className="debt-title">{debt.title}</p>
      <form className="debt-form">
        <label htmlFor="debt-balance">
          $
          <input
            className="nes-input debt-balance"
            name="balance"
            type="text"
            placeholder="0.00"
            value={formValues.balance}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label htmlFor="debt-minimum">
          $
          <input
            className="nes-input debt-minimum"
            name="minimum"
            type="text"
            placeholder="0.00"
            value={formValues.minimum}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <div>
          <input
            className="nes-input debt-interest"
            name="interestRate"
            type="text"
            placeholder="0.00"
            value={formValues.interestRate}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onFocus={(e) => e.target.select()}
          />
          <label htmlFor="debt-interest">%</label>
        </div>
      </form>
      <button
        onClick={() => deleteDebt(debt.id)}
        className="nes-btn is-error delete-debt"
        readOnly
        tabIndex="-1"
      >
        DELETE
      </button>
    </div>
  );
};

export default Debt;
