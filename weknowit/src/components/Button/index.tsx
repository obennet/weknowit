import React, {CSSProperties, MouseEventHandler} from "react";
import "./button.css";

interface ButtonProps {
    text: string;
    onClick?: any;
    style?: CSSProperties;
}

export const Button = ({text, onClick, style}: ButtonProps): JSX.Element => {
    return (
        <div className={"button-container"} onClick={onClick} style={style}>
            <p>{text}</p>
        </div>
    )
}
