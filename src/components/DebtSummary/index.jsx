const DebtSummary = ({
  totalDebts,
  monthsUntilPayoff,
  handleMethodChange,
  payoffMethod,
  sortedDebts,
}) => {
  return (
    <div className="nes-container is-rounded summary">
      <ul className="nes-list">
        <li>
          <span>Total Debt: ${totalDebts}</span>
        </li>
        <li>
          <span>Months Until Payoff: {monthsUntilPayoff} months</span>
        </li>
      </ul>
      <span>How would you like to pay off your debts?</span>
      <div className="debt-summary-radio">
        <label>
          <input
            type="radio"
            name="payoffMethod"
            value="snowball"
            id="snowball"
            onChange={handleMethodChange}
            className="nes-radio"
          />
          <span>Snowball Method</span>
        </label>

        <label>
          <input
            type="radio"
            name="payoffMethod"
            value="high-interest"
            id="high-interest"
            onChange={handleMethodChange}
            className="nes-radio"
          />
          <span>Highest Interest First</span>
        </label>
      </div>
      <ul
        className={`nes-list is-circle ${payoffMethod ? "visible" : "hidden"}`}
      >
        <span className="debt-summary-instructions">
          Heres the order you should pay off your debt:
        </span>
        {sortedDebts.map((debt, i) => {
          return (
            <li key={crypto.randomUUID()}>
              {i === 0 ? "First" : "Next"} you should pay off your {debt.title}.
              <br />
              It will take {debt.monthsUntilPayoff} months to pay off.
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DebtSummary;
