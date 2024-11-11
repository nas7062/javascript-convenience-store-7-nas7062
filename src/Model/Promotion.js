import { Console, DateTimes } from '@woowacourse/mission-utils';
import InputView from '../View/InputView.js';
import { PROMOTION_MESSAGE } from '../utils/message.js';

class Promotion {
  constructor(name, buy, get, startDate, endDate) {
    (this.name = name),
      (this.buy = buy),
      (this.get = get),
      (this.startDate = startDate.split('-').join('')),
      (this.endDate = endDate.split('-').join('')),
      (this.input = new InputView());
  }
  isPromotionActive() {
    let now = DateTimes.now().toString().split(' ');
    if (now[1] === 'Nov') {
      now[1] = '11';
    }
    if (now[1] === 'Dev') {
      now[1] === '12';
    }
    let date = now[3] + now[2] + now[1];
    return (
      Number(date) >= Number(this.startDate) &&
      Number(date) <= Number(this.endDate)
    );
  }
  async TwoPlusOne(name, count, promotionCount) {
    if (!this.isPromotionActive()) {
      Console.print(PROMOTION_MESSAGE.NON_PROMOTION(name));
      return { finalCount: count, FreeCount: 0 };
    }
    let FreeCount = Math.floor(count / (this.get + this.buy));
    let finalCount = count + FreeCount;
    if (count % (this.get + this.buy) !== 0) {
      const plus = await this.input.PromotionPrint(name);
      if (plus === 'Y') {
        count += this.calculateTwoPlusOne(count);
        FreeCount = Math.floor(count / (this.get + this.buy));
      }
    }
    if (finalCount > promotionCount) {
      finalCount = Math.min(FreeCount * 2, promotionCount);
      FreeCount = Math.floor(finalCount / (this.buy + this.get));
      return await this.promotionInput(name, count, promotionCount);
    }
    return { finalCount: count, FreeCount };
  }
  async OnePlusOne(name, count, promotionCount) {
    if (!this.isPromotionActive()) {
      Console.print(PROMOTION_MESSAGE.NON_PROMOTION(name));
      return { finalCount: count, FreeCount: 0 };
    }
    let FreeCount = Math.floor(count / (this.get + this.buy));
    let finalCount = count + FreeCount;
    if (finalCount <= promotionCount) {
      if (count % (this.get + this.buy) !== 0) {
        finalCount = Math.min(FreeCount * 2, promotionCount);
        FreeCount = Math.floor(finalCount / 3);
        const plus = await this.input.PromotionPrint(name);
        if (plus === 'Y') {
          FreeCount += 1;
          count += 1;
        }
      }
    }
    if (finalCount > promotionCount) {
      return await this.promotionInput(name, count, promotionCount);
    }
    return { finalCount: count, FreeCount };
  }
  async promotionInput(name, count, promotionCount) {
    const response = this.input.OnlyPromotionInput(name, count, promotionCount);
    if (response === 'Y') {
      return { finalCount: count, FreeCount };
    }
    if (response === 'N') {
      return { finalCount: finalCount, FreeCount };
    }
  }
  calculateTwoPlusOne(count) {
    const remainder = count % (this.buy + this.get);
    if (remainder === 1) {
      return 2;
    }
    return 1;
  }
}

export default Promotion;
