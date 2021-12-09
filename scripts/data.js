const database = {
  toppings: [
    {
      id: 1,
      name: "black olives",
      price: 1.25,
      type: "veggie"
    },
    {
      id: 2,
      name: "pepperoni",
      price: 2.25,
      type: "meat"
    },
    {
      id: 3,
      name: "banana peppers",
      price: 1.25,
      type: "veggie"
    },
    {
      id: 4,
      name: "pineapple",
      price: 1.25,
      type: "disgusting"
    },
    {
      id: 5,
      name: "bell peppers",
      price: 1.25,
      type: "veggie"
    },
    {
      id: 6,
      name: "bacon",
      price: 2.25,
      type: "meat"
    }
  ],
  crusts: [
    {
      id: 1,
      type: "deep dish",
      price: 2
    },
    {
      id: 2,
      type: "NY style",
      price: 1
    },
    {
      id: 3,
      type: "traditional hand tossed",
      price: 0
    }
  ],
  sizes: [
    {
      id: 1,
      circumference: 12,
      price: 7
    },
    {
      id: 2,
      circumference: 14,
      price: 10
    },
    {
      id: 3,
      circumference: 16,
      price: 12
    }
  ],
  orderToppings: [
    {
      id: 1,
      toppingId: 2,
      orderId: 1
    },
    {
      id: 2,
      toppingId: 5,
      orderId: 1
    },
    {
      id: 3,
      toppingId: 2,
      orderId: 2
    }
  ],
  orders: [
    {
      id: 1,
      crustId: 1,
      sizeId: 3,
      timestamp: 1638976763958
    },
    {
      id: 2,
      crustId: 2,
      sizeId: 1,
      timestamp: 1638976763958
    }
  ]
}

export const getToppings = () => {
  // return [...database.toppings] // a bald-faced lie. 
  return database.toppings.map( (topping) => ({...topping}) )
}

export const getCrusts = () => {
  return database.crusts.map( (crust) => ({...crust}) )
}

export const getSizes = () => {
  return database.sizes.map( (size) => ({...size}) )
}

export const getOrders = () => {
  return database.orders.map( (order) => ({...order}) )
}
export const getOrderToppings = () => {
  return database.orderToppings.map( (orderTopping) => ({...orderTopping}) )
}


// ==================================
// Our transient state
let orderState = {toppings: []}

// If an id is already in the orderState.toppings Array, instead of adding the id to create duplicates, we need to remove the id from the array
export const setOrderTopping = (id) => { 
  if ( orderState.toppings.includes(id) ) {
    orderState.toppings = orderState.toppings.filter( (toppingId) => toppingId !== id )
  } else {
    orderState.toppings.push(id)
  }
}

export const setOrderSize = (id) => orderState.sizeId = id
export const setOrderCrust = (id) => orderState.crustId = id

// ==================
// Update the db order state 
export const addCustomerOrder = () => {

  if (orderState.sizeId && orderState.crustId && orderState.toppings.length > 0 ) { 

    const newOrder = {
      sizeId: orderState.sizeId,
      crustId: orderState.crustId,
      timestamp: Date.now(),
      id: calcId(database.orders)
    }
  
    database.orders.push(newOrder)

    // Now, we need to create a record or records of the related toppings for this order
    for ( const toppingId of orderState.toppings ) {
      // make an orderToppings object and add it to our db
      const newOrderTopping = {
        id: calcId(database.orderToppings),
        toppingId: toppingId,
        orderId: newOrder.id
      }

      database.orderToppings.push(newOrderTopping)
    }
    // alert anything that's listening to the fact that our db has been updated
    document.dispatchEvent(new CustomEvent("dbStateChanged"))
  
    orderState = {toppings: []}

  } else {
    window.alert("please select one ingredient per menu selection")
  }

}

const calcId = (arr) => {
  const lastIndex = arr.length - 1
  if (lastIndex === -1) {
    // return always ends the function
    const newId = 1
    return newId
  }
  const lastItemId = arr[lastIndex].id
  const newId = lastItemId + 1
  return newId
}

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
