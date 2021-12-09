import { 
  getOrders, 
  getToppings, 
  getCrusts, 
  getSizes, 
  getOrderToppings 
} from "./data.js";

const toppings = getToppings()
const crusts = getCrusts()
const sizes = getSizes()

export const Order = () => {
  const orders = getOrders()
  const orderToppings = getOrderToppings()

  let ordersList = ""

  if ( orders.length > 0 ) {
    ordersList += `<ul>`
    const ordersArray = orders.map( (order) => {
  
      // use the order's sizeId property to get to the proper size obj, and its circumference prop
      const foundSize = sizes.find( (size) => size.id === order.sizeId )
      const foundCrust = crusts.find( (taco) => taco.id === order.crustId )

      //filter our orderToppings to get n toppings
      const foundOrderToppings = orderToppings.filter( (orderTopping) => orderTopping.orderId === order.id)

      const foundToppings = toppings.filter( (topping) => {
        //compare this topping to all of the orderToppings
        // To understand what is happening here, 
        // remember what find returns if it doesn't find anything: undefined!
        // This function we are inside has a job: To return true or false ( or truthy/falsy)
        // So, we return what find returns ( returnception! ), which is either 
        // 1) an object (truthy)
        // 2) undefined (falsy)
        // That way our function that we passed into filter also returns either true or false,
        // which allows the filter to know which topping obj to place into our foundToppings arr
        return foundOrderToppings.find( (orderTopping) => orderTopping.toppingId === topping.id )
      })

      let orderPrice = foundCrust.price + foundSize.price

      for (const topping of foundToppings) {
        orderPrice += topping.price
      }
      
      return `
        <li order--list-item">
          Order #${order.id} placed on ${new Date(order.timestamp).toLocaleString()},
          is a ${foundSize.circumference}-inch ${foundCrust.type} pizza
          with
          ${foundToppings.map((topping) => topping.name).join(" and ")}
          <p>
          Total Price: $${orderPrice.toFixed(2)}
          </p> 
        </li>
        `
    })
  
    ordersList += ordersArray.join("")
    ordersList += `</ul>`
  }

  return ordersList 
}