import React, { useEffect, useState } from "react";

interface Props {
  value: number;
  readonly?: boolean;
  size?: number;
}

export const Rating = ({ value, readonly = false, size = 5 }: Props) => {
  const [stars, setStars] = useState([...Array(5).keys()]);

  useEffect(() => {
    setStars([...Array(size).keys()]);
  }, [size]);

  return (
    <div className="rating">
      {stars.map((star) => (
        <input
          type="radio"
          className="mask mask-star"
          checked={value === star + 1}
          readOnly={readonly}
          key={star}
        />
      ))}
    </div>
  );
};
