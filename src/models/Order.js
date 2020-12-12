const { Schema, model } = require("mongoose");
const OrderSchema = new Schema(
  {
    _id: String,
    item: { type: String, ref: "Item" },
    coupon: String,
    amount: Number,
    paid: Boolean,
    phone: String,
    email: String,
    utm_params: {
      source: String,
      medium: String,
      campaign: String,
      term: String,
    },
    order_id: String,
    payment_id: String,
  },
  { timestamps: true }
);
// OrderSchema.methods.returnByDate = async function () {
//   try {
//     const currentDate = new Date().getTime();
//     const obj = await this.find({});
//   } catch (error) {
//     console.error(error.message);
//   }
// };
module.exports = model("Order", OrderSchema);
