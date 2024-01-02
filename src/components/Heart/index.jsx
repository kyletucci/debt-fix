const Heart = ({ isFilled }) => {
  return (
    <i
      id={crypto.randomUUID()}
      className={`nes-icon is-small heart ${isFilled ? "" : "is-empty"}`}
    ></i>
  );
};

export default Heart;
