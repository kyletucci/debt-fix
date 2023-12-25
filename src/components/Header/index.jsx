import { useState } from "react";

const Header = ({ onAddCategory }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCategory(title);
    setTitle("");
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add category to budget"
          value={title}
          onChange={onChangeTitle}
        />
        <button>Add</button>
      </form>
    </header>
  );
};

export default Header;
