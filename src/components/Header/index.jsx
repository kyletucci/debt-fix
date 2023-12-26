import { useState } from "react";
import "./Header.css";

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
    <header className="nes-container is-rounded is-dark header">
      <form className="header-form" onSubmit={handleSubmit}>
        <input
          className="nes-input header-input"
          type="text"
          placeholder="Add category.."
          value={title}
          onChange={onChangeTitle}
        />
        <button type="button" className="nes-btn is-success">
          Add
        </button>
      </form>
    </header>
  );
};

export default Header;
