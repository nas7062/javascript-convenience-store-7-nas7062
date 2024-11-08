import { Console } from "@woowacourse/mission-utils";
import Validate from "../utils/Validate.js";
import { ERROR_MESSAGE, INPUT_MESSAGE, PROMOTION_MESSAGE } from "../utils/message.js";
class InputView {
  async BuyInput(productList) {
    try {
      const buyInput = await Console.readLineAsync(INPUT_MESSAGE.BUY_INPUT);
      Validate.EmptyInput(buyInput);
      const products = buyInput.split('],[').map(product => {
        const cleanProduct = product.replace('[', '').replace(']', '').trim();
        const [name, quantity] = cleanProduct.split('-');
        if (!name || !quantity) {
          throw new Error(ERROR_MESSAGE.INVALID_INPUT);
        }
        Validate.isQuantityInStock(name, quantity, productList);
        return { name: name.trim(), quantity: Number(quantity.trim()) };
      });
      Validate.BuyValid(products);
      return products;
    } catch (error) {
      Console.print(error.message);
      return await this.BuyInput(productList);
    }
  }
  async MemberShipInput() {
    try {
      const input = await Console.readLineAsync(INPUT_MESSAGE.MEMBER_SHIP);
      const UpperInput = input.toUpperCase().trim();
      if (UpperInput !== 'Y' && UpperInput !== 'N') {
        throw new Error(ERROR_MESSAGE.YES_OR_NO)
      }
      else
        return UpperInput;
    } catch (error) {
      Console.print(error.message);
      return await this.MemberShipInput();
    }
  }
  async PromotionPrint(name) {
    try {
      const input = await Console.readLineAsync(PROMOTION_MESSAGE.PROMOTION_PLUS(name));
      const UpperInput = input.toUpperCase().trim();
      if (UpperInput !== 'Y' && UpperInput !== 'N') {
        throw new Error(ERROR_MESSAGE.YES_OR_NO)
      }
      else
        return UpperInput;
    } catch (error) {
      Console.print(error.message);
      return await this.PromotionPrint(name);
    }
  }
  async OnlyPromotionInput(name, count, finalCount) {
    try {
      const input = await Console.readLineAsync(PROMOTION_MESSAGE.ONLY_PROMOTION(name,count,finalCount));
      const UpperInput = input.toUpperCase().trim();
      if (UpperInput !== 'Y' && UpperInput !== 'N') {
        throw new Error(ERROR_MESSAGE.YES_OR_NO)
      }
      else
        return UpperInput;
    } catch (error) {
      Console.print(error.message);
      return await this.OnlyPromotionInput(name,count,finalCount);
    }
  }

}

export default InputView;