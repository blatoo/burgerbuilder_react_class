import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<div onClick={props.open_sidebar}>MENU</div>
			<div className={classes.Logo}>
				<Logo>LOGO</Logo>
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems></NavigationItems>
			</nav>
		</header>
	);
};

export default toolbar;
