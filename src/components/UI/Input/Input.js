import React from "react";
import classes from "./Input.module.css";

/**
 * an input field with different type
 * @param {*} elementType "input", "textarea", "select"
 * @param elementConfig {type: 'text', placeholder: 'Your name'}
 * @param value the default value of this input
 * @param clicked <function> for <input onChange=...>
 * @param inputLabel <String>
 * @param props different atttributes (option)
 *
 * @returns <Label><input>
 */
const Input = props => {
	let inputElement = null;

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={classes.inputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={classes.inputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select
					className={classes.inputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={classes.inputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
