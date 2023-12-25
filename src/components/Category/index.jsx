import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Category.css";
import { useState } from "react";

const Category = ({ category, onDelete }) => {
  const [budget, setBudget] = useState(0);

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };
  return (
    <div className="category-container">
      <p>{category.title}</p>
      <form>
        <label htmlFor="monthlyBudget">$</label>
        <input
          name="monthlyBudget"
          type="text"
          placeholder="0.00"
          value={budget}
          onChange={handleBudgetChange}
        />
      </form>
      <button onClick={() => onDelete(category.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default Category;
