import React, { Component } from "react";
import Aux from "../../hoc/Auxilian";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = props => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerOpenHandler = props=>{
		this.setState({showSideDrawer: true})
	}
	render() {
		return (
			<Aux>
				<Toolbar open_sidebar={this.sideDrawerOpenHandler}/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}> {this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
