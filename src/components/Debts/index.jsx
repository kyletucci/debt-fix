import Debt from "../Debt/index.jsx";

import "./Debts.css";

const Debts = ({
  deleteDebt,
  updateDebt,
  debtCategories,
  disposableIncome,
  setDebtCategories,
}) => {
  return (
    <>
      {debtCategories.map((debt) => (
        <Debt
          key={crypto.randomUUID()}
          debt={debt}
          deleteDebt={deleteDebt}
          updateDebt={updateDebt}
          disposableIncome={disposableIncome}
          setDebtCategories={setDebtCategories}
        />
      ))}
    </>
  );
};

export default Debts;
