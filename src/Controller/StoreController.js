import ParseProducts from "../ParseProduct.js";
import { productData, promotionData } from "../utils/productsData.js";
import Result from "../Result.js";
import InputView from "../View/InputView.js";
import OutputView from "../View/OutputView.js";
import { Console } from "@woowacourse/mission-utils"
import { ERROR_MESSAGE, PROMOTION_NAME } from "../utils/message.js";
class StoreController {

  constructor() {
    this.output = new OutputView();
    this.input = new InputView();
    this.parser = new ParseProducts(productData, promotionData);
    this.productList = [];
    this.promotionList = [];
    this.orderList = [];
    this.free = [];
  }

  async Start() {
    try {
      this.output.printWelcome();
      await this.LoadProduct();
      this.order = await this.input.BuyInput(this.productList);
      await this.ApplyPromotion();
      this.membership = await this.input.MemberShipInput();
      await this.OrderSummary();
      await this.ReStartPrint();
    } catch (error) {
      Console.print(error.message);
    }
  }

  async LoadProduct() {
    try {
      if (this.productList.length === 0) {
        this.productList = await this.parser.parse();
        this.promotionList = await this.parser.parsePromotion();
      }
      this.productList.forEach((product) => {
        this.output.printProduct(product);
      });
    } catch (error) {
      Console.print(error.message);
    }
  }
  Result() {
    this.result = new Result(this.productList, this.free, this.order);
    const buyprice = this.result.BuyPrice();
    const freePrice = this.result.FreePrice();
    const memberPrice = this.result.MembershipDiscount(this.promotionList, this.membership);
    const totalPrice = this.result.TotalPrice(this.promotionList, this.membership);
    this.output.printDiscountSummary(buyprice, freePrice, memberPrice, totalPrice);
    this.free = [];
  }
  async OrderSummary() {
    this.output.printReceipt(this.order, this.productList);
    this.output.printFreeItems(this.free);
    this.Result();
  }
  async ReStartPrint() {
    try {
      const input = await Console.readLineAsync(`감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n`);
      const UpperInput = input.toUpperCase();
      if (UpperInput !== 'Y' && UpperInput !== 'N') {
        throw new Error(ERROR_MESSAGE.YES_OR_NO)
      }
      if (UpperInput === 'Y')
        return await this.Start();
    } catch (error) {
      Console.print(error.message);
    }
  }
  async ApplyPromotion() {
    for (const item of this.order) {
      let product = this.findValidProduct(item.name);
      if (product) {
        const promotion = this.promotionList.find((promo) => promo.name === product.promotion);
        if (promotion) {
          if (promotion.name === PROMOTION_NAME.TWO_PLUS_ONE) {
            const { finalCount, FreeCount } = await promotion.TwoPlusOne(
            item.name, item.quantity, product.promotionCount
            );
            item.quantity = finalCount;
            this.updateProductQuantity(item, product, finalCount, FreeCount);
          }
          if (promotion.name === PROMOTION_NAME.FLASH_SALE || promotion.name === PROMOTION_NAME.RECOMMENDED) {
            const { finalCount, FreeCount } = await promotion.OnePlusOne(
              item.name, item.quantity, product.promotionCount
            );
            item.quantity= finalCount;
            this.updateProductQuantity(item, product, finalCount, FreeCount);
          }
        } if (!promotion) {
          product.quantity -= item.quantity;
        }
      }
    }
  }

  findValidProduct(productName) {
    return (
      this.productList.find((prod) => prod.name === productName && prod.promotionCount > 0) ||
      this.productList.find((prod) => prod.name === productName)
    );
  }
  updateProductQuantity(item, product, finalCount, FreeCount) {
    const appliedCount = Math.min(finalCount, product.promotionCount);
    product.promotionCount -= appliedCount;
    const remainingCount = finalCount - appliedCount;
    if (remainingCount > 0) {
      const nextProduct = this.productList.find(
        (prod) => prod.name === item.name && prod.promotionCount > 0
      );
      if (nextProduct) {
        nextProduct.quantity -= remainingCount;
      }
    }
    this.free.push({ name: product.name, quantity: FreeCount });
  }

}

export default StoreController;