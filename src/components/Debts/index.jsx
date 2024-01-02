import Debt from "../Debt/index.jsx";

import "./Debts.css";

const Debts = ({ deleteDebt, updateDebt, debts, disposableIncome }) => {
  return (
    <>
      {debts
        .sort((a, b) => a.balance - b.balance)
        .map((debt) => (
          <Debt
            key={crypto.randomUUID()}
            debt={debt}
            deleteDebt={deleteDebt}
            updateDebt={updateDebt}
            disposableIncome={disposableIncome}
          />
        ))}
    </>
  );
};

export default Debts;
