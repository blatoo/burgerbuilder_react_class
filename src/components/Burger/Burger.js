import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

/**
 * A picture of Burger with ingredients
 * 
 * @param {Object} props.igredients A object with salad, meat, bacon, cheese
 * @returns a stack of <BurgerIngredient>
 */
const burger = props => {
	console.log(props.ingredients)
	let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	}).reduce((cum, curr)=>{
		return cum.concat(curr)
	}, []);

	if (transformedIngredients.length === 0){
		transformedIngredients = <p>Please start adding ingredients!</p>
	}

	console.log(transformedIngredients); 

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
