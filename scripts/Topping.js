import { getToppings, setOrderTopping } from "./data.js";

const toppings = getToppings()

document.addEventListener("change", (event) => {
  if (event.target.name === "topping") {
    const [,toppingId] = event.target.value.split("--")
    setOrderTopping(parseInt(toppingId))
  }
})

export const Topping = () => {
  const toppingsHTML = toppings.map( (topping) => {
    return `
      <li class="choice-list-item topping--list-item">
        <input type="checkbox" value="topping--${topping.id}" name="topping"> ${topping.name}
      </li>
      <div class="price">
        Price: $${topping.price.toFixed(2)}
      </div>
      `
  })

  return toppingsHTML.join("")
}