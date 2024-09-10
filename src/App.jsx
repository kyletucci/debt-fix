import "./App.css";
import "nes.css/css/nes.min.css";
import { useEffect, useState } from "react";
import BudgetCalculator from "./components/BudgetCalculator";
import DebtCalculator from "./components/DebtCalculator";

function App() {
  const [disposableIncome, setDisposableIncome] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    loadSavedDisposableIncome();
    loadSavedIncome();
  }, []);

  const setAndSaveDisposableIncome = (income, monthlySpend) => {
    const newDisposableIncome = income - monthlySpend;
    setDisposableIncome(newDisposableIncome);
    localStorage.setItem(
      "disposable_income",
      JSON.stringify(newDisposableIncome)
    );
  };

  const loadSavedDisposableIncome = () => {
    const saved = localStorage.getItem("disposable_income");
    if (saved) {
      setDisposableIncome(JSON.parse(saved));
    }
  };

  const setIncomeAndSave = (newIncome) => {
    newIncome = Number(newIncome);
    setIncome(newIncome);
    localStorage.setItem("monthly_income", JSON.stringify(newIncome));
  };

  const loadSavedIncome = () => {
    const saved = localStorage.getItem("monthly_income");
    if (saved) {
      setIncome(JSON.parse(saved));
    }
  };

  const [debtCategories, setDebtCategories] = useState(() => {
    const saved = localStorage.getItem("debt_categories");
    if (saved == null) return [];
    return JSON.parse(saved);
  });

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [totalDebts, setTotalDebts] = useState();

  const [monthsUntilPayoff, setMonthsUntilPayoff] = useState();

  return (
    <div className="main-container">
      <nav className="page-nav">
        <p className="title-font">DEBTFIX</p>
        <a className="logout-btn" href="#">
          LOG OUT
        </a>
      </nav>
      <div className="app-container">
        <BudgetCalculator
          setAndSaveDisposableIncome={setAndSaveDisposableIncome}
          disposableIncome={disposableIncome}
          income={income}
          setIncomeAndSave={setIncomeAndSave}
          saveToLocalStorage={saveToLocalStorage}
        />
        <DebtCalculator
          totalDebts={totalDebts}
          setTotalDebts={setTotalDebts}
          debtCategories={debtCategories}
          setDebtCategories={setDebtCategories}
          income={income}
          disposableIncome={disposableIncome}
          saveToLocalStorage={saveToLocalStorage}
          monthsUntilPayoff={monthsUntilPayoff}
          setMonthsUntilPayoff={setMonthsUntilPayoff}
        />
      </div>
    </div>
  );
}

export default App;
