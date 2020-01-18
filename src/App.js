import "./App.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import CheckoutSummary from "./Order/CheckoutSummary/CheckoutSummary";
import Orders from "./containers/Orders/Orders";

export class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
