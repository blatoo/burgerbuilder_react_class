import React, { Component } from "react";
import Aux from "../../hoc/Auxilian";
import Burger from "../../components/Burger/Burger";
export class BurgerBuilder extends Component {
	render() {
		return (
			<Aux>
				<Burger></Burger>
				<div>Build Controls</div>
			</Aux>
		);
	}
}

export default BurgerBuilder;
