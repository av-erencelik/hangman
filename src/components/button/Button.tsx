import React from "react";

const Button = (props: {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className="bg-black w-[30PX] h-[30px] text-cyan-300 shrink hover:scale-105 transition-all disabled:bg-gray-500"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
