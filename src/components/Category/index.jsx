import "./Category.css";
import { useState } from "react";

const Category = ({ category, onDelete, updateBudget }) => {
  const [budget, setBudget] = useState(category.budget);

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
    updateBudget(category.id, event.target.value, event);
  };

  return (
    <div className="nes-container is-rounded is-dark category">
      <p className="category-title">{category.title}</p>
      <div className="form-container">
        <form
          className="category-form"
          onSubmit={(event) => {
            updateBudget(category.id, budget, event);
            document.activeElement.blur();
          }}
        >
          <label htmlFor="budgetInput">$</label>
          <input
            className="nes-input budget"
            name="budgetInput"
            type="text"
            placeholder="0.00"
            value={budget}
            onChange={handleBudgetChange}
            onFocus={(e) => e.target.select()}
          />
        </form>
        <button
          className="nes-btn is-error"
          onClick={() => onDelete(category.id)}
          readOnly
          tabIndex="-1"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Category;
