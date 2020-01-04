import React from "react";
import Aux from "../../../hoc/Auxilian";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: "capitalize" }}>{igKey}</span>:
				{props.ingredients[igKey]}
			</li>
		);
	});

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.purchasingCancel}>
				Cancel
			</Button>
			<Button btnType="Success" clicked={props.purchasingContinue}>
				Continue
			</Button>
			<p>
				<strong>Total Price: {props.price.toFixed(2)}</strong>
			</p>
		</Aux>
	);
};

export default orderSummary;
