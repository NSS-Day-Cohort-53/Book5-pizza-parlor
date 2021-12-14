import { PizzaParlor } from "./PizzaParlor.js";
import {
	fetchToppings,
	fetchCrusts,
	fetchSizes,
	fetchOrders,
	fetchOrderToppings,
} from "./data.js";

const render = () => {
	fetchToppings()
		.then(() => fetchCrusts())
		.then(() => fetchSizes())
		.then(() => fetchOrders())
		.then(() => fetchOrderToppings())
		.then(() => {
			document.querySelector("#content").innerHTML = PizzaParlor();
		});
};
render()
// rerender our app data as HTML when a new order is created
document.addEventListener("dbStateChanged", () => render());

// TODO: Make the DOM refresh ( rerender the HTML ) when a new order is created
// Why? Our DOM represents the db state on page load, BUT when the db state changes, by adding a new order to our orders collection, our application state and our db state are no longer in sync with each other. Our DOM representation of our data is no longer accurate

// Questions:
// At what exact point is our db state changed?
// A: When the order object is pushed to the database.orders array

// What is currently responsible for 'pulling the trigger' to render our HTML?
// A: The main.js module

// Answer these two questions and we can get to a solution
