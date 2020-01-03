import React, { Component } from "react";
import Aux from "../../hoc/Auxilian";
import Burger from "../../components/Burger/Burger";
export class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0, 
            bacon: 0,
            cheese: 0,
            meat: 0, 

        }
    }

    

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients}></Burger>
				<div>Build Controls</div>
			</Aux>
		);
	}
}

export default BurgerBuilder;
