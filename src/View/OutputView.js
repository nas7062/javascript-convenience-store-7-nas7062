import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_MESSAGE, OUTPUT_MESSAGE } from "../utils/message";
class OutputView {
  printWelcome() {
    Console.print(OUTPUT_MESSAGE.HELLO);
    Console.print(OUTPUT_MESSAGE.INTRO);
  }

  printProduct(product) {
    const { name, price, quantity, promotionCount, promotion } = product;
    let promotionText = '';
    if (promotion) {
      promotionText = ` ${promotion}`;
    }
    const localPrice = price.toLocaleString();
    if (promotion) {
      if (promotionCount === 0) {
        return Console.print(PROMOTION_MESSAGE.PROMOTION_ZERO(name,localPrice,promotion));
      }
      return Console.print(PROMOTION_MESSAGE.PROMOTION_AMOUNT(name,localPrice,promotionCount,promotion));
    }
    if (!promotion) {
      if (quantity === 0) {
        return Console.print(PROMOTION_MESSAGE.NON_PROMOTION_ZERO(name,localPrice));
      }
      return Console.print(PROMOTION_MESSAGE.NON_PROMOTION_AMOUNT(name,localPrice,quantity));
    }
  }

  printReceipt(order, products) {
    Console.print(OUTPUT_MESSAGE.RECEIPT_INTRO);
    Console.print(OUTPUT_MESSAGE.RECEIPT_INFO);
    order.forEach((item) => {
      const product = products.find((prod) => prod.name === item.name);
      if (product) {
        const price = product.price * item.quantity;
        Console.print(`${item.name}     ${item.quantity}     ${price.toLocaleString()}`);
      }
    });
  }

  printFreeItems(freeItems) {
    Console.print(OUTPUT_MESSAGE.FREE_LINE);
    freeItems.forEach((item) => {
      Console.print(`${item.name}      ${item.quantity}`);
    });
    Console.print(OUTPUT_MESSAGE.LINE);
  }

  printDiscountSummary(buy, freeDiscount, memberDiscount, total) {
    Console.print(`${OUTPUT_MESSAGE.TOTAL_PRICE}    ${buy.totalCount}    ${buy.totalprice.toLocaleString()}`);
    Console.print(`${OUTPUT_MESSAGE.SALE}       -${freeDiscount.toLocaleString()}`);
    Console.print(`${OUTPUT_MESSAGE.MEMBERSHIP}      -${memberDiscount.toLocaleString()}`);
    Console.print(`${OUTPUT_MESSAGE.RESULT_PRICE}        ${total.toLocaleString()}`);
  }
}

export default OutputView;
