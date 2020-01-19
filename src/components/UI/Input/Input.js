import React from "react";
import classes from "./Input.module.css";

/**
 * an input field with different type
 * @param {*} elementType "input", "textarea", "select"
 * @param elementConfig {type: 'text', placeholder: 'Your name'}
 * @param value the default value of this input
 * @param clicked <function> for <input onChange=...>
 * @param inputLabel <String>
 * @param shouldValidate <boolean> should this input area be validated
 * @param invalid <boolean> result of checked validation
 * @param touched <boolean> If the input area never been touched by the user, then the validation should not be checked
 * @param props different atttributes (option)
 *
 * @returns <Label><input>
 */
const Input = props => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select
					className={inputClasses.join(" ")}
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
