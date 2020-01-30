import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
const sideDrawer = props => {
	let attachedClasses = [];

	attachedClasses = props.open
		? [classes.SideDrawer, classes.Open]
		: [classes.SideDrawer, classes.Close];

	return (
		<Fragment>
			<Backdrop show={props.open} clicked={props.closed}></Backdrop>
			<div className={attachedClasses.join(" ")}>
				<div className={classes.Logo}>
					<Logo></Logo>
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth}> </NavigationItems>
				</nav>
			</div>
		</Fragment>
	);
};

export default sideDrawer;
