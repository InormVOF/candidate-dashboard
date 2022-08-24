import React, { useEffect, useState } from "react";

interface Props {
  name: string;
  value: number;
  readonly?: boolean;
  size?: number;
  onChange?: (value: number) => void;
}

export const Rating = ({
  name,
  value,
  readonly = false,
  size = 5,
  onChange = () => null,
}: Props) => {
  const [stars, setStars] = useState([...Array(5).keys()]);

  useEffect(() => {
    setStars([...Array(size).keys()]);
  }, [size]);

  return (
    <div className="rating">
      {stars.map((star) => (
        <input
          type="radio"
          name={name}
          className="mask mask-star"
          defaultChecked={value === star + 1}
          readOnly={readonly}
          key={star}
          onChange={() => onChange(star + 1)}
        />
      ))}
    </div>
  );
};
