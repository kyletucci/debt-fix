import Debt from "../Debt/index.jsx";

import "./Debts.css";

const Debts = ({ deleteDebt, updateDebt, debts }) => {
  return (
    <>
      {debts
        .sort((a, b) => b.balance - a.balance)
        .map((debt) => (
          <Debt
            key={crypto.randomUUID()}
            debt={debt}
            deleteDebt={deleteDebt}
            updateDebt={updateDebt}
          />
        ))}
    </>
  );
};

export default Debts;
