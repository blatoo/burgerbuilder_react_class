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
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated){
			this.setState({ purchasing: true })
		}else{
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
		
	};

	purchasingCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchasingContinueHandler = () => {
		this.props.onInitPurchase()
		this.props.history.push({
			pathname: "/checkout"
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

		return sum > 0;
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

		let burger = this.props.error ? (
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
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(
			actions.setAuthRedirectPath(path)
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
