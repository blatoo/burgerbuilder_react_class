import React, { Component } from "react";
import Aux from "../../../hoc/Auxillians/Auxilian";
import Button from "../../UI/Button/Button";

/**
 * Showed after clicke "Order"
 * @param ingredient \{salad: ??, meat: ??, bacon: ??, cheese: ??}
 * @param purchasingCancel <Button clicked=???> cancel </Button>
 * @param purchasingContinue <Button clicked=?> Continue </Button>
 * @param price the total price of the order
 * 
 * @returns ingredients, <Button> <Button>, total price
 */
class OrderSummary extends Component {

	componentDidUpdate(){
		console.log('[OrderSummary] WillUpdate')
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: "capitalize" }}>{igKey}</span>:
					{this.props.ingredients[igKey]}
				</li>
			);
		});
		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchasingCancel}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={this.props.purchasingContinue}>
					Continue
				</Button>
				<p>
					<strong>Total Price: {this.props.price.toFixed(2)}</strong>
				</p>
			</Aux>
		);
	}
}

export default OrderSummary;
