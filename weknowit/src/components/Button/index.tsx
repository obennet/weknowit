import React, {CSSProperties} from "react";
import "./button.css";

interface ButtonProps {
    text: string;
    onClick?: any;
    style?: CSSProperties;
}

/**
 * A custom button component
 * @param text - text visible on button
 * @param onClick - function triggered on click
 * @param style - CSS properties
 * @constructor
 */
export const Button = ({text, onClick, style}: ButtonProps): JSX.Element => {
    return (
        <div className={"button-container"} onClick={onClick} style={style}>
            <p>{text}</p>
        </div>
    )
}
