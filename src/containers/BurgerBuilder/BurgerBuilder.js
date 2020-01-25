import React, { Component } from "react";
import Aux from "../../hoc/Auxillians/Auxilian";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		purchasable: false,

		purchasing: false,

		loading: false,

		error: false
	};

	componentDidMount() {
		console.log(this.props);
		// axios
		// 	.get("ingredients.json")
		// 	.then(response => this.setState({ ingredients: response.data }))
		// 	.catch(error => {
		// 		this.setState({ error: true });
		// 	});
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchasingCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchasingContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push("price=" + this.state.totalPrice);

		const queryString = queryParams.join("&");

		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryString
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

	render() {
		const disabledInfo = { ...this.props.ings };

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		if (this.props.ings) {
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchasingCancel={this.purchasingCancelHandler}
					purchasingContinue={this.purchasingContinueHandler}
					price={this.props.price}
				></OrderSummary>
			);
		}

		let burger = this.state.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			console.log(this.props.ings);
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ings}></Burger>
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: ingName =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
