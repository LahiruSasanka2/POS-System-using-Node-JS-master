"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderDetails = /** @class */ (function () {
    function OrderDetails(orderId, itemCode, qty, unitPrice) {
        this.orderId = orderId;
        this.itemCode = itemCode;
        this.qty = qty;
        this.unitPrice = unitPrice;
    }
    return OrderDetails;
}());
exports.OrderDetails = OrderDetails;
