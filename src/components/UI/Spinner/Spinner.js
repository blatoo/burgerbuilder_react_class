import React from "react";
import classes from "./Spinner.module.css";

/**
 * A Spinner when lodaing. No parameter required
 */
const spinner = () => {
	return <div className={classes.Loader}>Loading...</div>;
};

export default spinner;
