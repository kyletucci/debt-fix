import { useState, useEffect } from "react";
import Header from "../Header";
import Categories from "../Categories";
import BudgetSummary from "../BudgetSummary";

const BudgetCalculator = ({ setAndSaveDisposableIncome, disposableIncome }) => {
  const [categories, setCategories] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    loadSavedIncome();
    loadSavedCategories();
    loadSavedTotalBudget();
  }, [totalBudget, disposableIncome, income]);

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

  const setCategoriesAndSave = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  const loadSavedCategories = () => {
    const saved = localStorage.getItem("categories");
    if (saved) {
      setCategories(JSON.parse(saved));
      setTotalBudget(JSON.parse(saved).reduce((a, c) => a + +c.budget, 0));
    }
  };

  const deleteCategoryById = (categoryId) => {
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategoriesAndSave(newCategories);
    setTotalBudgetAndSave(newCategories.reduce((a, c) => a + +c.budget, 0));
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

  const setIncomeAndSave = (newIncome) => {
    newIncome = Number(newIncome);
    setIncome(newIncome);
    localStorage.setItem("income", JSON.stringify(newIncome));
  };

  const loadSavedIncome = () => {
    const saved = localStorage.getItem("income");
    if (saved) {
      setIncome(JSON.parse(saved));
    }
  };

  const handleIncomeChange = (event) => {
    setIncomeAndSave(event.target.value);
  };

  return (
    <div className="nes-container is-dark with-title budget-calculator">
      <p className="title">Budget Calculator</p>
      <Header addCategory={addCategory} />
      <Categories
        categories={categories}
        deleteCategoryById={deleteCategoryById}
        updateBudget={updateBudget}
      />
      <BudgetSummary
        setAndSaveDisposableIncome={setAndSaveDisposableIncome}
        totalBudget={totalBudget}
        disposableIncome={disposableIncome}
        handleIncomeChange={handleIncomeChange}
        income={income}
      />
    </div>
  );
};

export default BudgetCalculator;
