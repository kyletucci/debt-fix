const DebtSummary = ({ totalDebts, disposableIncome }) => {
  return (
    <div className="nes-container is-rounded summary">
      <ul className="nes-list is-circle">
        <li>
          <span>Total Debt: ${totalDebts}</span>
        </li>
        <li>
          <span>
            Months Until Payoff: {(totalDebts / disposableIncome).toFixed(2)}{" "}
            months
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DebtSummary;
