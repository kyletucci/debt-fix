import { useEffect } from "react";

const DebtSummary = ({
  totalDebts,
  disposableIncome,
  setAndSaveMonthsUntilPayoff,
  monthsUntilPayoff,
  sortedDebts,
}) => {
  useEffect(() => {
    setAndSaveMonthsUntilPayoff(totalDebts, disposableIncome);
  }, [disposableIncome, totalDebts]);
  return (
    <div className="nes-container is-rounded summary">
      <ul className="nes-list is-circle">
        <li>
          <span>Total Debt: ${totalDebts}</span>
        </li>
        <li>
          <span>
            Months Until Payoff: {monthsUntilPayoff}
            months
          </span>
        </li>
        <li className="debt-summary-radio">
          <span>How would you like to pay off your debts?</span>
          <label>
            <input type="radio" className="nes-radio" name="answer" checked />
            <span>Snowball Method</span>
          </label>

          <label>
            <input type="radio" className="nes-radio" name="answer" />
            <span>Highest Debt First</span>
          </label>
        </li>
      </ul>
      <span>Heres how you should pay off your debt:</span>
      <ul className="nes-list is-circle visible">
        {sortedDebts.map((debt, i) => {
          return (
            <li key={crypto.randomUUID()}>
              {i === 0 ? "First" : "Next"} you should pay off your {debt.title}.
              It will take {debt.monthsUntilPayoff} months to pay off.
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DebtSummary;
