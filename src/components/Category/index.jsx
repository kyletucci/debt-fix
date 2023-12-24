import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Category.css";
import { useState } from "react";

const Category = ({ category, key, onDelete }) => {
  const [budget, setBudget] = useState("");
  const handleBudget = (event) => {
    setBudget(event.target.value);
  };

  return (
    <li className="category-container" key={key}>
      <FontAwesomeIcon
        className="trash-button"
        onClick={() => onDelete(category)}
        icon={faTrash}
      />
      <span className="category-name">{category}</span>
      <div>
        <label className="label" htmlFor="budgetInput">
          $
        </label>
        <input
          className="budget-input"
          name="budgetInput"
          type="text"
          placeholder="0.00"
          value={budget}
          onChange={handleBudget}
        />
      </div>
    </li>
  );
};

export default Category;
