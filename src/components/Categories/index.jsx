import Category from "../Category/index";
const Categories = ({ categories, deleteCategoryById, updateBudget }) => {
  return (
    <div>
      {categories
        .sort((a, b) => b.budget - a.budget)
        .map((category) => (
          <Category
            key={category.id}
            category={category}
            deleteCategoryById={deleteCategoryById}
            updateBudget={updateBudget}
          />
        ))}
    </div>
  );
};

export default Categories;
