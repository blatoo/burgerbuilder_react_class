import React from "react";
import classes from "./NavigationItem.module.css";
import {NavLink} from "react-router-dom"


/**
 * a modified navlink
 * @param {*} link the path of the link for <NavLink to=???>
 * @param {boolean} exact boolean for <NavLink to=... exact>
 * 
 * @return <NavLink> 
 */
const navigationItem = props => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink activeClassName={classes.active} to={props.link} exact={props.exact}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default navigationItem;
