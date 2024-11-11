class Result {
  constructor(productlist, free, order) {
    this.productlist = productlist,
      this.free = free,
      this.order = order
  }

  BuyPrice() {
    let totalprice = 0;
    let totalCount = 0;
    this.order.forEach((item) => {
      const Item = this.productlist.find((prod) => prod.name === item.name);
      if (Item) {
        const price = Item.price * item.quantity;
        totalprice += price;
        totalCount += item.quantity;
      }
    })
    return { totalCount, totalprice };
  }

  FreePrice() {
    let totalFree = 0;
    this.free.forEach((item) => {
      const Item = this.productlist.find((prod) => prod.name === item.name);
      if (Item) {
        const price = Item.price * item.quantity;
        totalFree += price;
      }
    })
    return totalFree;
  }

  MembershipDiscount(promotion, membership) {
    let MembershipDiscount = 0;
    if (membership === 'Y') {
      this.order.forEach((item) => {
        const Item = this.productlist.find((prod) => prod.name === item.name);
        const isPromotionApplied = promotion.some((promo) => promo.name === Item.promotion);
        if (Item && !isPromotionApplied) {
          MembershipDiscount += Item.price * item.quantity * 0.3;
        }
      });
      return MembershipDiscount;
    }
    return 0;
  }
  
  TotalPrice(promotion, membership) {
    const { totalprice } = this.BuyPrice();
    const freeprice = this.FreePrice();
    const membershipPrice = this.MembershipDiscount(promotion, membership);
    const result = totalprice - freeprice - membershipPrice;
    return result;
  }
}

export default Result;