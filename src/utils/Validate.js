import { ERROR_MESSAGE } from "./message.js";

class Validate {
  static BuyValid(products) {
    for (let product of products) {
      if (!product.name || !product.quantity || isNaN(product.quantity) || product.quantity <= 0) {
        throw new Error(ERROR_MESSAGE.INVALID_INPUT);
      }
    }
  }
  static EmptyInput(buyInput) {
    if (!buyInput || buyInput.trim() === '') {
      throw new Error(ERROR_MESSAGE.INVALID_INPUT);
    }
  }
  static isQuantityInStock(name, quantity, productList) {
    const foundProducts = productList.filter(product => product.name === name.trim());
    let totalCount = 0;
    foundProducts.forEach((item) => {
      totalCount += Number(item.quantity);
    });
    if (totalCount < Number(quantity)) {
      throw new Error(ERROR_MESSAGE.OVER_COUNT);
    }
  }
}
export default Validate;