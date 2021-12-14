const applicationState = {
	toppings: [],
	crusts: [],
	sizes: [],
	orders: [],
	orderToppings: [],
	orderState: {
		toppings: [],
	},
};

// This is reaching out over the internet for data
// We have no control over how long this will take
// You have to wait for a request/response to complete
// fetch returns, INSTANTLY, an object -- a Promise
// A Promise guarantees that we will EVENTUALLY get a response ( the data or an error )
// .then acts like an event listener. It will call a function for us when the data is ready
export const fetchToppings = () => {
	return fetch("http://localhost:8088/toppings")
		.then((toppingsData) => toppingsData.json()) //turn our toppings json data into a js array
		.then((toppings) => {
			console.log(toppings);
			applicationState.toppings = toppings;
		});
};

export const fetchCrusts = () => {
	return fetch("http://localhost:8088/crusts")
		.then((crustsData) => crustsData.json()) //turn our crusts json data into a js array
		.then((crusts) => {
			console.log(crusts);
			applicationState.crusts = crusts;
		});
};

export const fetchSizes = () => {
	return fetch("http://localhost:8088/sizes")
		.then((sizesData) => sizesData.json()) //turn our sizes json data into a js array
		.then((sizes) => {
			console.log(sizes);
			applicationState.sizes = sizes;
		});
};

export const fetchOrders = () => {
	return fetch("http://localhost:8088/orders")
		.then((ordersData) => ordersData.json()) //turn our orders json data into a js array
		.then((orders) => {
			console.log(orders);
			applicationState.orders = orders;
		});
};

export const fetchOrderToppings = () => {
	return fetch("http://localhost:8088/orderToppings")
		.then((otData) => otData.json()) //turn our ot json data into a js array
		.then((ot) => {
			console.log(ot);
			applicationState.orderToppings = ot;
		});
};

export const getToppings = () => {
	return applicationState.toppings.map((topping) => ({ ...topping }));
};

export const getCrusts = () => {
	return applicationState.crusts.map((crust) => ({ ...crust }));
};

export const getSizes = () => {
	return applicationState.sizes.map((size) => ({ ...size }));
};

export const getOrders = () => {
	return applicationState.orders.map((order) => ({ ...order }));
};
export const getOrderToppings = () => {
	return applicationState.orderToppings.map((orderTopping) => ({
		...orderTopping,
	}));
};

// ==================================
// Our transient state

// If an id is already in the orderState.toppings Array, instead of adding the id to create duplicates, we need to remove the id from the array
export const setOrderTopping = (id) => {
	if (applicationState.orderState.toppings.includes(id)) {
		applicationState.orderState.toppings =
			applicationState.orderState.toppings.filter(
				(toppingId) => toppingId !== id
			);
	} else {
		applicationState.orderState.toppings.push(id);
	}
};

export const setOrderSize = (id) => (applicationState.orderState.sizeId = id);
export const setOrderCrust = (id) => (applicationState.orderState.crustId = id);

// ==================
// Update the db order state
export const addCustomerOrder = () => {
	if (
		applicationState.orderState.sizeId &&
		applicationState.orderState.crustId &&
		applicationState.orderState.toppings.length > 0
	) {
		const newOrder = {
			sizeId: applicationState.orderState.sizeId,
			crustId: applicationState.orderState.crustId,
			timestamp: Date.now(),
		};

		fetch(`http://localhost:8088/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newOrder),
		})
			.then((response) => response.json())
			.then((newOrderWithId) => {
				const orderToppingsPromises = [];

				for (const toppingId of applicationState.orderState.toppings) {
					// make an orderToppings object and add it to our db
					const newOrderTopping = {
						toppingId: toppingId,
						orderId: newOrderWithId.id,
					};
					orderToppingsPromises.push(
						fetch(`http://localhost:8088/orderToppings`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(newOrderTopping),
						})
					);
				}
				return Promise.all(orderToppingsPromises);
			})
			.then(() => {
				// alert anything that's listening to the fact that our db has been updated
				document.dispatchEvent(new CustomEvent("dbStateChanged"));
				applicationState.orderState = { toppings: [] };
			});
	} else {
		window.alert("please select one ingredient per menu selection");
	}
};

const calcId = (arr) => {
	const lastIndex = arr.length - 1;
	if (lastIndex === -1) {
		// return always ends the function
		const newId = 1;
		return newId;
	}
	const lastItemId = arr[lastIndex].id;
	const newId = lastItemId + 1;
	return newId;
};

//TODO:
// Allow users to select multiple toppings for an order
// FIRST THING TO DO! -- Update the ERD
// Toppings Module:
// Change radio btns to checkboxes
// Orders Module:
// Change the structure the HTML for displaying orders ( to list multiple toppings )
// Change how the total price is calculated
// Data.JS
// Update the data structure
// Write some new getter and setter functions ( TBD )
// Update getOrders
// Update addCustomerOrder
