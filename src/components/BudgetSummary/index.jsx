import { useEffect, useState } from "react";

const BudgetSummary = ({
  setAndSaveDisposableIncome,
  totalBudget,
  disposableIncome,
}) => {
  const [income, setIncome] = useState(0);

  useEffect(() => {
    loadSavedIncome();
  }, []);
  const handleIncomeChange = (event) => {
    setIncomeAndSave(event.target.value);
  };

  const setIncomeAndSave = (newIncome) => {
    setIncome(newIncome);
    localStorage.setItem("income", JSON.stringify(newIncome));
  };

  const loadSavedIncome = () => {
    const saved = localStorage.getItem("income");
    if (saved) {
      setIncome(JSON.parse(saved));
    }
  };

  return (
    <div className="nes-container is-rounded summary">
      <ul className="nes-list is-circle">
        <li className="monthly-income">
          <span>
            Monthly Income:
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleIncomeChange;
                setAndSaveDisposableIncome(income - totalBudget);
                document.activeElement.blur();
              }}
            >
              <label className="income-label" htmlFor="income-input">
                $
              </label>
              <input
                name="income-input"
                className="nes-input"
                type="text"
                value={income}
                onChange={handleIncomeChange}
                onClick={(event) => event.target.select()}
              />
            </form>
          </span>
        </li>
        <li>
          <span>Monthly Spend: ${totalBudget}</span>
        </li>
        <li>
          <span>Disposable Income = ${disposableIncome}</span>
        </li>
      </ul>
    </div>
  );
};

export default BudgetSummary;
