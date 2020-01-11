import React, { Component } from "react";
import Aux from "../../hoc/Auxillians/Auxilian";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDINT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,

		totalPrice: 4,

		purchasable: false,

		purchasing: false,

		loading: false,

		error: false
	};

	componentDidMount() {
		axios
			.get("ingredients.json")
			.then(response => this.setState({ ingredients: response.data }))
			.catch(error => {
				this.setState({ error: true });
			});
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchasingCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchasingContinueHandler = () => {
		// alert("You will continue...");
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Max Schwarzmüller",
				address: {
					street: "Teststreet 1",
					zipCode: "41351",
					country: "Germany"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};

		axios
			.post("/orders.json", order)
			.then(response => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch(error => {
				this.setState({ loading: false, purchasing: false });
			});
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

		let orderSummary = null;
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		if (this.state.ingredients) {
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchasingCancel={this.purchasingCancelHandler}
					purchasingContinue={this.purchasingContinueHandler}
					price={this.state.totalPrice}
				></OrderSummary>
			);
		}

		let burger = this.state.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.state.ingredients}></Burger>
					<BuildControls
						ingredientAdded={this.addIntegredientHandler}
						ingredientRemoved={this.removeIntegredidentHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</React.Fragment>
			);
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchasingCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
