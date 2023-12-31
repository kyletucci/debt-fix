const BudgetSummary = ({
  setAndSaveDisposableIncome,
  totalBudget,
  disposableIncome,
  handleIncomeChange,
  income,
}) => {
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
                setAndSaveDisposableIncome(income, totalBudget);
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
