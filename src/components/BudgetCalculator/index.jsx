import { useState, useEffect } from "react";
import Header from "../Header";
import Categories from "../Categories";
import BudgetSummary from "../BudgetSummary";

const BudgetCalculator = ({
  income,
  setAndSaveDisposableIncome,
  disposableIncome,
  setIncomeAndSave,
}) => {
  const [categories, setCategories] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    loadSavedCategories();
    loadSavedTotalBudget();
  }, [totalBudget, disposableIncome, income]);

  useEffect(() => {
    setAndSaveDisposableIncome(income, totalBudget);
  }, [income, totalBudget]);

  const loadSavedCategories = () => {
    const saved = localStorage.getItem("budget_categories");
    if (saved) {
      setCategories(JSON.parse(saved));
      setTotalBudget(JSON.parse(saved).reduce((a, c) => a + +c.budget, 0));
    }
  };

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

  const updateBudget = (categoryId, budget, event) => {
    event.preventDefault();
    const newCategories = categories.map((category) => {
      if (categoryId === category.id) {
        return { ...category, budget: budget };
      }
      return category;
    });
    const newTotalBudget = newCategories.reduce((a, c) => a + +c.budget, 0);
    setCategoriesAndSave(newCategories);
    setTotalBudgetAndSave(newTotalBudget);
    setAndSaveDisposableIncome(income, newTotalBudget);
  };

  const setTotalBudgetAndSave = (newTotalBudget) => {
    setTotalBudget(newTotalBudget);
    localStorage.setItem("monthly_spend", JSON.stringify(newTotalBudget));
  };

  const setCategoriesAndSave = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("budget_categories", JSON.stringify(newCategories));
  };

  const loadSavedTotalBudget = () => {
    const saved = localStorage.getItem("monthly_spend");
    if (saved) {
      setTotalBudget(JSON.parse(saved));
    }
  };

  const handleIncomeChange = (event) => {
    setIncomeAndSave(event.target.value);
    setAndSaveDisposableIncome(income, totalBudget);
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
