import Heart from "../Heart/index.jsx";

const Month = ({ month, monthNumber, totalMonths }) => {
  const drawHearts = () => {
    const lastMonthNumber = Math.ceil(totalMonths / 4);
    const hearts = [];
    for (let i = 0; i < 4; i++) {
      hearts.push(
        <Heart
          isFilled={
            lastMonthNumber > monthNumber ||
            (lastMonthNumber === monthNumber && totalMonths % 4 > i)
              ? true
              : false
          }
        />
      );
    }
    return hearts;
  };

  return (
    <div className="month-container">
      <span>{month}</span>
      <span className="heart-container">{drawHearts()}</span>
    </div>
  );
};

export default Month;
