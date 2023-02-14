import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const StarRating = ({ rating, setRating, ratingColors }) => {
  const [hover, setHover] = useState(0);

  return (
    <>
      {[...Array(5)].map((star, index) => {
        index = index + 1;
        return (
          <button
            type="button"
            key={index}
            className="btn-star"
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {index <= (rating || hover) ? (
              <FontAwesomeIcon color={ratingColors[rating]} icon={faStar} />
            ) : (
              <FontAwesomeIcon icon={faStarRegular} />
            )}
          </button>
        );
      })}
    </>
  );
};

export default StarRating;
