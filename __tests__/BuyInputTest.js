import { ERROR_MESSAGE } from '../src/utils/message';
import Validate from '../src/utils/Validate';

describe('BuyInput 입력 유효성 테스트', () => {

    
  test('BuyInput 빈칸 입력시 예외 발생', () => {
    expect(() => {
      Validate.EmptyInput('');
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });

  test('BuyInput 입력 안할 시  예외 발생', () => {
    expect(() => {
      Validate.EmptyInput(null);
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });

  test('BuyInput quantity 입력 안할 시  예외 발생', () => {
    expect(() => {
      Validate.BuyValid(["사이다-"]);
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });

  test('BuyInput name 입력 안할 시  예외 발생', () => {
    expect(() => {
      Validate.BuyValid(["-4"])
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });
  
  test('BuyInput quantity 0 이하 시 예외 발생', () => {
    expect(() => {
      Validate.BuyValid(["사이다--4"])
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });

  test('BuyInput quantity가 숫자 아닐경우 예외 발생', () => {
    expect(() => {
      Validate.BuyValid(["사이다-a"])
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });
  
});
