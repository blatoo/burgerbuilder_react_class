import "./App.css";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import React, { Component, Suspense } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import Auth from "./containers/Auth/Auth";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

export class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route
						path="/checkout"
						render={props => (
							<Suspense fallback={<div>Loading Checkout...</div>}>
								<Checkout {...props} />
							</Suspense>
						)}
					/>
					<Route
						path="/orders"
						render={() => (
							<Suspense fallback={<div>Loading Orders...</div>}>
								<Orders />
							</Suspense>
						)}
					/>
					<Route path="/auth" component={Auth} />

					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			);
		}

		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => {
			dispatch(actions.authCheckState());
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
