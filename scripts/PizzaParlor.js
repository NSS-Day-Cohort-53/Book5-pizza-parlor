import { Topping } from "./Topping.js";
import { Crust } from "./Crust.js";
import { Size } from "./Size.js";
import { OrderButton } from "./OrderButton.js";
import { Order } from "./Order.js"

export const PizzaParlor = () => `
  <h1>Mama Leoni's Pizza Place</h1>
  <div class="menu">
    <article class="menu__ingredient toppings">
      <h2>Toppings</h2>
      <ul>
      ${Topping()}
      </ul>
    </article>
    <article class="menu__ingredient crusts">
      <h2>Crusts</h2>
      <ul>
      ${Crust()}
      </ul>
    </article>
    <article class="menu__ingredient sizes">
      <h2>Sizes</h2>
      <ul>
      ${Size()}
      </ul>
    </article>
  </div>
  </article>
    ${OrderButton()}
  <article>
  <article>
    ${Order()}
  </article> 
  `



