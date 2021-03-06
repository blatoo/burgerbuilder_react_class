import React, { Component } from "react";
import Aux from "../Auxilian";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux'

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = props => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = props => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		console.log(this.props.isAuthenticated)
		return (
			<Aux>
				<Toolbar isAuth={this.props.isAuthenticated}drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}> {this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return { 
		isAuthenticated: state.auth.token !== null
}}

export default connect(mapStateToProps)(Layout);
