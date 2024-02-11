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

  const setIncomeAndSave = (newIncome) => {
    newIncome = Number(newIncome);
    setIncome(newIncome);
    localStorage.setItem("monthlyIncome", JSON.stringify(newIncome));
  };

  const loadSavedIncome = () => {
    const saved = localStorage.getItem("monthlyIncome");
    if (saved) {
      setIncome(JSON.parse(saved));
    }
  };

  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem("debts");
    if (saved == null) return [];
    return JSON.parse(saved);
  });

  return (
    <div className="main-container">
      <div className="app-container">
        <BudgetCalculator
          setAndSaveDisposableIncome={setAndSaveDisposableIncome}
          disposableIncome={disposableIncome}
          income={income}
          setIncomeAndSave={setIncomeAndSave}
        />
        <DebtCalculator
          debts={debts}
          setDebts={setDebts}
          income={income}
          disposableIncome={disposableIncome}
        />
      </div>
    </div>
  );
}

export default App;
