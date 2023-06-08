import React from "react";

const Button = ({onClick, className, children, type = "button"}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-3 px-6 rounded-lg capitalize bg-primary mt-auto ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
