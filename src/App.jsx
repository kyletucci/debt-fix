import "./App.css";
import "nes.css/css/nes.min.css";
import { useEffect, useState } from "react";
import BudgetCalculator from "./components/BudgetCalculator";
import DebtCalculator from "./components/DebtCalculator";

function App() {
  const [disposableIncome, setDisposableIncome] = useState(0);

  useEffect(() => {
    loadSavedDisposableIncome();
  }, []);

  const setAndSaveDisposableIncome = (income, monthlySpend) => {
    const newDisposableIncome = income - monthlySpend;
    setDisposableIncome(newDisposableIncome);
    localStorage.setItem(
      "disposableIncome",
      JSON.stringify(newDisposableIncome)
    );
  };

  const loadSavedDisposableIncome = () => {
    const saved = localStorage.getItem("disposableIncome");
    if (saved) {
      setDisposableIncome(JSON.parse(saved));
    }
  };

  return (
    <div className="main-container">
      <img className="app-logo" src="src/assets/cover.png" alt="debtfix logo" />
      <div className="app-container">
        <BudgetCalculator
          setAndSaveDisposableIncome={setAndSaveDisposableIncome}
          disposableIncome={disposableIncome}
        />
        <DebtCalculator disposableIncome={disposableIncome} />
      </div>
    </div>
  );
}

export default App;
