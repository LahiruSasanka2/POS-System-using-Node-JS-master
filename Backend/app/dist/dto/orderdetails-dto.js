"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderDetailsDTO = /** @class */ (function () {
    function OrderDetailsDTO(orderId, itemCode, qty, unitPrice) {
        this.orderId = orderId;
        this.itemCode = itemCode;
        this.qty = qty;
        this.unitPrice = unitPrice;
    }
    return OrderDetailsDTO;
}());
exports.OrderDetailsDTO = OrderDetailsDTO;
