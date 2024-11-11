export const ERROR_MESSAGE = Object.freeze({
  YES_OR_NO: '[ERROR] Y아니면 N로 입력해주세요.',
  INVALID_INPUT: '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
  OVER_COUNT : '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
})
export const PROMOTION_NAME = Object.freeze({
  TWO_PLUS_ONE: '탄산2+1',
  FLASH_SALE: '반짝할인',
  RECOMMENDED: 'MD추천상품',
})
export const INPUT_MESSAGE = Object.freeze({
  BUY_INPUT: '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
  MEMBER_SHIP: '멤버십 할인을 받으시겠습니까? (Y/N)\n',
})
export const OUTPUT_MESSAGE = Object.freeze({
  HELLO: '\n안녕하세요. W편의점입니다.',
  INTRO : '현재 보유하고 있는 상품입니다.\n',
  RECEIPT_INTRO : '\n===========W 편의점=============',
  RECEIPT_INFO : '상품명    수량    금액',
  FREE_LINE : '=============증	정===============',
  LINE: '==============================',
  TOTAL_PRICE: `총구매액`,
  SALE: `행사할인`,
  MEMBERSHIP: `멤버십할인`,
  RESULT_PRICE:'내실돈'
})
export const PROMOTION_MESSAGE = {
  NON_PROMOTION: (name) => `[ERROR] ${name} 프로모션은 현재 유효하지 않습니다.`,
  PROMOTION_PLUS: (name) => `현재 ${name}은(는) 1개 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
  ONLY_PROMOTION: (name,count,finalCount) => `현재 ${name} ${count - finalCount}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
  PROMOTION_ZERO : (name,localPrice,promotion) => `- ${name} ${localPrice}원 재고 없음 ${promotion}`,
  PROMOTION_AMOUNT : (name,localPrice,count,promotion) => `- ${name} ${localPrice}원 ${count}개 ${promotion}`,
  NON_PROMOTION_ZERO : (name,localPrice) => `- ${name} ${localPrice}원 재고 없음`,
  NON_PROMOTION_AMOUNT : (name,localPrice,quantity) => `- ${name} ${localPrice}원 ${quantity}개`,
}