import "./App.css";
import "nes.css/css/nes.min.css";
import { useEffect, useState } from "react";
import BudgetCalculator from "./components/BudgetCalculator";
import DebtCalculator from "./components/DebtCalculator";

function App() {
  const [disposableIncome, setDisposableIncome] = useState(0);

  useEffect(() => {
    loadSavedDisposableIncome();
  }, [disposableIncome]);

  const setAndSaveDisposableIncome = (income, monthlySpend) => {
    setDisposableIncome(income - monthlySpend);
    localStorage.setItem("disposableIncome", JSON.stringify(disposableIncome));
  };

  const loadSavedDisposableIncome = () => {
    const saved = localStorage.getItem("disposableIncome");
    if (saved) {
      setDisposableIncome(JSON.parse(saved));
    }
  };

  return (
    <div className="app-container">
      <BudgetCalculator
        setAndSaveDisposableIncome={setAndSaveDisposableIncome}
        disposableIncome={disposableIncome}
      />
      <DebtCalculator disposableIncome={disposableIncome} />
    </div>
  );
}

export default App;
