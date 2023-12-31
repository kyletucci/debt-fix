import "./App.css";
import "nes.css/css/nes.min.css";
import Header from "./components/Header/index";
import Categories from "./components/Categories/index";
import Debts from "./components/Debts";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "categories";

function App() {
  const [categories, setCategories] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [disposableIncome, setDisposableIncome] = useState(0);

  const loadSavedCategories = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setCategories(JSON.parse(saved));
      setTotalBudget(JSON.parse(saved).reduce((a, c) => a + +c.budget, 0));
    }
  };

  useEffect(() => {
    loadSavedDisposableIncome();
    loadSavedCategories();
    loadSavedTotalBudget();
    loadSavedIncome();
  }, [totalBudget, disposableIncome]);

  const addCategory = (categoryTitle) => {
    if (categoryTitle !== "") {
      setCategoriesAndSave([
        ...categories,
        {
          title: categoryTitle,
          id: crypto.randomUUID(),
          budget: 0,
        },
      ]);
    }
  };

  const deleteCategoryById = (categoryId) => {
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategoriesAndSave(newCategories);
    setTotalBudgetAndSave(newCategories.reduce((a, c) => a + +c.budget, 0));
  };

  const setCategoriesAndSave = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCategories));
  };

  const updateBudget = (categoryId, budget, event) => {
    event.preventDefault();
    const newCategories = categories.map((category) => {
      if (categoryId === category.id) {
        return { ...category, budget: budget };
      }
      return category;
    });
    setCategoriesAndSave(newCategories);
    setTotalBudgetAndSave(newCategories.reduce((a, c) => a + +c.budget, 0));
  };

  const setTotalBudgetAndSave = (newTotalBudget) => {
    setTotalBudget(newTotalBudget);
    localStorage.setItem("totalBudget", JSON.stringify(newTotalBudget));
  };

  const loadSavedTotalBudget = () => {
    const saved = localStorage.getItem("totalBudget");
    if (saved) {
      setTotalBudget(JSON.parse(saved));
    }
  };

  const setDisposableIncomeAndSave = (newDisposableIncome) => {
    setDisposableIncome(income - newDisposableIncome);
    localStorage.setItem(
      "disposableIncome",
      JSON.stringify(newDisposableIncome)
    );
  };

  const handleIncomeChange = (event) => {
    setIncomeAndSave(event.target.value);
  };

  const setIncomeAndSave = (newIncome) => {
    setIncome(newIncome);
    localStorage.setItem("income", JSON.stringify(newIncome));
  };

  const loadSavedIncome = () => {
    const saved = localStorage.getItem("income");
    if (saved) {
      setIncome(JSON.parse(saved));
    }
  };

  const loadSavedDisposableIncome = () => {
    const saved = localStorage.getItem("disposableIncome");
    if (saved) {
      setDisposableIncome(JSON.parse(saved));
    }
  };

  return (
    <div className="app-container">
      <div className="nes-container is-dark with-title app">
        <p className="title">Budget Calculator</p>
        <Header onAddCategory={addCategory} />
        <Categories
          categories={categories}
          onDelete={deleteCategoryById}
          updateBudget={updateBudget}
        />
        <div className="nes-container is-rounded summary">
          <ul className="nes-list is-circle">
            <li className="monthly-income">
              <span>
                Monthly Income:
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleIncomeChange;
                    setDisposableIncomeAndSave(income - totalBudget);
                    document.activeElement.blur();
                  }}
                >
                  <label className="income-label" htmlFor="income-input">
                    $
                  </label>
                  <input
                    name="income-input"
                    className="nes-input"
                    type="text"
                    value={income}
                    onChange={handleIncomeChange}
                    onClick={(event) => event.target.select()}
                  />
                </form>
              </span>
            </li>
            <li>
              <span>Monthly Spend: ${totalBudget}</span>
            </li>
            <li>
              <span>Disposable Income = ${disposableIncome}</span>
            </li>
          </ul>
        </div>
      </div>
      <Debts disposableIncome={disposableIncome} addCategory={addCategory} />
    </div>
  );
}

export default App;
