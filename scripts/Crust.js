import { getCrusts, setOrderCrust } from "./data.js";

const crusts = getCrusts()

document.addEventListener("change", (event) => {
  if (event.target.name === "crust") {
    const [,crustId] = event.target.value.split("--")
    setOrderCrust(parseInt(crustId))
  }
})

export const Crust = () => {
  const crustsHTML = crusts.map( (crust) => {
    return `
      <li class="choice-list-item crust--list-item">
        <input type="radio" value="crust--${crust.id}" name="crust"> ${crust.type}
      </li>
      <div class="price">
        Price: ${ crust.price > 0 ? '$' + crust.price.toFixed(2) : "No additional charge" }
      </div>
      `
  })

  return crustsHTML.join("")
}

// Ternary Statement
// If statement for show-offs
// or a nice small alternative
// if (true) {
//   do this
// }
// else {
//  do this instead
// }