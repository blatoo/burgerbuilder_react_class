import React from "react";
import classes from "./Input.module.css";

/**
 * an input field with different type
 * @param {*} inputtype "input", "textarea", "select"
 * @param inputLabel <String>
 * @param props different atttributes (option)
 *
 * @returns <Label><input>
 */
const Input = props => {
	let inputElement = null;

	switch (props.inputtype) {
		case "input":
			inputElement = <input className={classes.inputElement} {...props} />;
			break;
		case "textarea":
			inputElement = <textarea className={classes.inputElement} {...props} />;
			break;
		default:
			inputElement = <input className={classes.inputElement} {...props} />;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
