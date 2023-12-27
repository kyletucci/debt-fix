const Heart = ({ isFilled }) => {
  //   const [isFilled, setIsFilled] = useState(false);

  //   const toggleFilled = (isFilled) => {
  //     setIsFilled(!isFilled);
  //   };

  return (
    <i
      id={crypto.randomUUID()}
      className={`nes-icon is-small heart ${isFilled ? "" : "is-empty"}`}
    ></i>
  );
};

export default Heart;
