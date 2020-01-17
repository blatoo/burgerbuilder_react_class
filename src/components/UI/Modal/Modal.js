import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";


/**
 * Modal format the subchildren, include: <Backdrop>
 * @param show for <Backdrop show=???>
 * @param modalClosed for <Backdrop clicked=???>
 * @returns <Backdrop>, children
 */
class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	componentDidUpdate() {
		console.log("[Modal] WillUpdate");
	}

	render() {
		return (
			<React.Fragment>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}>
					{" "}
				</Backdrop>
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
						opacity: this.props.show ? "1" : "0"
					}}
				>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

export default Modal;
