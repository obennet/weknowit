import React, {MouseEventHandler} from "react";
import "./button.css";

interface ButtonProps {
    text: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Button = ({text, onClick}: ButtonProps): JSX.Element => {
    return (
        <div className={"button-container"} onClick={onClick}>
            <p>{text}</p>
        </div>
    )
}
