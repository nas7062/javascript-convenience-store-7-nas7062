import Product from "./Model/Product.js";
import Promotion from "./Model/Promotion.js";

class ParseProducts {

  constructor(product, promotion) {
    this.product = product;
    this.promotion = promotion;
  }

  async parse() {
    const lines = this.product.trim().split('\n');
    const products = [];
    for (let i = 1; i < lines.length; i++) {
      const [name, price, quantity, promotion] = lines[i].split(',');
      let processedPromotion = promotion.trim();
      if (processedPromotion === 'null') {
        processedPromotion = null;
      }
      products.push(new Product(
        name.trim(),
        Number(price.trim()),
        Number(quantity.trim()),
        processedPromotion,
        Number(quantity.trim())
      ));
    }
    return products;
  }
  async parsePromotion() {
    const lines = this.promotion.trim().split('\n');
    const promotions = [];
    for (let i = 1; i < lines.length; i++) {
      const [name, buy, get, startDate, endDate] = lines[i].split(',').map(item => item.trim());
      promotions.push(new Promotion(
        name.trim(),
        Number(buy.trim()),
        Number(get.trim()),
        startDate,
        endDate
      ));
    }

    return promotions;
  }
}

export default ParseProducts;
