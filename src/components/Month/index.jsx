import { useEffect } from "react";
import Heart from "../Heart/index.jsx";

const Month = ({ month, monthNumber, monthsUntilPayoff }) => {
  useEffect(() => {
    drawHearts();
  }, []);

  const lastMonthNumber = Math.floor(monthsUntilPayoff);

  const drawHearts = () => {
    const hearts = [];
    for (let i = 0; i < 4; i++) {
      hearts.push(
        <Heart
          isFilled={
            lastMonthNumber >= monthNumber ||
            (lastMonthNumber + 1 === monthNumber &&
              monthsUntilPayoff % 1 >= (i + 1) / 4)
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
0;
