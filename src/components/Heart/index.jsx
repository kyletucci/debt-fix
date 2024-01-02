import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const Heart = ({ isFilled }) => {
  return (
    <FontAwesomeIcon
      className={`heart-icon ${isFilled ? "filled" : ""}`}
      icon={isFilled ? faHeartSolid : faHeartOutline}
    />
  );
};

export default Heart;
