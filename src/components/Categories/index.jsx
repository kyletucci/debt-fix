import Category from "../Category/index";

const Categories = ({ categories, onDelete, updateBudget }) => {
  return (
    <div>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onDelete={onDelete}
          updateBudget={updateBudget}
        />
      ))}
    </div>
  );
};

export default Categories;
