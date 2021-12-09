import { getSizes, setOrderSize } from "./data.js";

const sizes = getSizes()

document.addEventListener("change", (event) => {
  if (event.target.name === "size") {
    const [,sizeId] = event.target.value.split("--")
    setOrderSize(parseInt(sizeId))
  }
})

export const Size = () => {
  const sizesHTML = sizes.map( (size) => {
    return `
      <li class="choice-list-item size--list-item">
        <input type="radio" value="size--${size.id}" name="size"> ${size.circumference}-inch
      </li>
      <div class="price">
        Price: $${size.price.toFixed(2)}
      </div>
      `
  })

  return sizesHTML.join("")
}