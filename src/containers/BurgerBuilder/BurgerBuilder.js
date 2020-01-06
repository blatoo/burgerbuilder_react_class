import React, { Component } from "react";
import Aux from "../../hoc/Auxillians/Auxilian";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDINT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},

		totalPrice: 4,

		purchasable: false,

		purchasing: false
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchasingCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchasingContinueHandler = () => {
		alert("You will continue...");
	};
	updatePurchaseState = updatedIngredients => {
		const sum = Object.keys(updatedIngredients)
			.map(key => {
				return updatedIngredients[key];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	};

	addIntegredientHandler = type => {
		const updatedIngredents = { ...this.state.ingredients };
		updatedIngredents[type] = updatedIngredents[type] + 1;

		const newPrice = this.state.totalPrice + INGREDINT_PRICES[type];
		this.setState({ ingredients: updatedIngredents, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredents);
	};

	removeIntegredidentHandler = type => {
		if (this.state.ingredients[type] <= 0) {
			return;
		}

		const updatedIngredents = { ...this.state.ingredients };
		updatedIngredents[type] = updatedIngredents[type] - 1;

		const newPrice = this.state.totalPrice - INGREDINT_PRICES[type];
		this.setState({ ingredients: updatedIngredents, totalPrice: newPrice });

		this.updatePurchaseState(updatedIngredents);
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		console.log(disabledInfo);

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					purchasingCancel={this.purchasingCancelHandler}
					purchasing={this.state.purchasing}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchasingCancel={this.purchasingCancelHandler}
						purchasingContinue={this.purchasingContinueHandler}
						price={this.state.totalPrice}
					></OrderSummary>
				</Modal>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls
					ingredientAdded={this.addIntegredientHandler}
					ingredientRemoved={this.removeIntegredidentHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
