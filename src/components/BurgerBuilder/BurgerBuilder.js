import React, { Component } from "react";
import Aux from "../../hoc/Auxilian";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
export class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		}
	};

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls />
			</Aux>
		);
	}
}

export default BurgerBuilder;
