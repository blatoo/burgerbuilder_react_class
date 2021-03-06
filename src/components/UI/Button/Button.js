import React from "react";
import classes from "./Button.module.css";

/**
 * A button with style
 * @param {String} props.btnType "Success", "Danger"
 * @param {function} props.clicked Function will executed when the component is clicked
 * @param {boolean} disabled
 * @returns <button> object
 */
//const button = {clicked, children, btnType} => {
const button = props => {
	return (
		<button
			className={[classes.Button, classes[props.btnType]].join(" ")}
			onClick={props.clicked}
			disabled = {props.disabled}
		>
			{props.children}
		</button>
	);
};

export default button;
