import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Category.css";
import { useState } from "react";

const Category = ({ category, onDelete, updateBudget }) => {
  const [budget, setBudget] = useState(category.budget);

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
    updateBudget(category.id, event.target.value, event);
  };

  return (
    <div className="category-container">
      <p>{category.title}</p>
      <div className="form-container">
        <form
          onSubmit={(event) => {
            updateBudget(category.id, budget, event);
            document.activeElement.blur();
          }}
        >
          <label htmlFor="budgetInput">$</label>
          <input
            className="budget-input"
            name="budgetInput"
            type="text"
            placeholder="0.00"
            value={budget}
            onChange={handleBudgetChange}
            onFocus={(e) => e.target.select()}
          />
        </form>
        <button
          className="category-add-button"
          onClick={() => onDelete(category.id)}
          readOnly
          tabIndex="-1"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Category;
