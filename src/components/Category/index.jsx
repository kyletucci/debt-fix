import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Category.css";
import { useState } from "react";

const Category = ({ category, key, onDelete, saveBudget }) => {
  const [budget, setBudget] = useState(0);
  const handleBudget = (event) => {
    const newBudget = event.target.value;
    setBudget(newBudget);
  };

  return (
    <li className="category-container" key={key}>
      <FontAwesomeIcon
        className="trash-button"
        onClick={() => onDelete(category)}
        icon={faTrash}
      />
      <span className="category-name">{category}</span>
      <div className="budget-container">
        <label className="label" htmlFor="budgetInput">
          $
        </label>
        <input
          className="budget-input"
          name="budgetInput"
          type="number"
          placeholder="0"
          value={budget}
          onChange={handleBudget}
        />
      </div>
      <span className="budget-element">{budget}</span>
    </li>
  );
};

export default Category;
