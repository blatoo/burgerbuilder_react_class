import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

/**
 * show the input of the contact data
 * @param ingredients
 * @param price
 *
 * @return <form>
 */
class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCodde: ""
		},
		loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: "Max Schwarzmüller",
				address: {
					street: "Teststreet 1",
					zipCode: "41351",
					country: "Germany"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};

		axios
			.post("/orders.json", order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch(error => {
				this.setState({ loading: false });
			});

		// axios
		// 	.post("/orders.json", order)
		// 	.then(response => {
		// 		this.setState({ loading: false, purchasing: false });
		// 	})
		// 	.catch(error => {
		// 		this.setState({ loading: false, purchasing: false });
	};

	render() {
		let form = (
			<form>
				<Input
					inputtype="input"
					inputLabel=""
					type="text"
					name="name"
					placeholder="Your name"
				/>
				<Input
					inputtype="input"
					inputLabel=""
					type="text"
					name="email"
					placeholder="Your email"
				/>
				<Input
					inputtype="input"
					inputLabel=""
					type="text"
					name="street"
					placeholder="Street"
				/>
				<Input
					inputtype="input"
					inputLabel=""
					type="text"
					name="postal"
					placeholder="Postal"
				/>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
