import React from "react";

type CardProps = {
    children: JSX.Element
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-5">
      {children}
    </div>
  );
};

export default Card;
