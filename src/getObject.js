const mongoose = require("mongoose");
const Order = require("./models/Order");
const Item = require("./models/Item");
module.exports = getObjects = async () => {
  //Kick-off Mongoose connection
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log(`connected`))
    .catch((err) => console.error(err.message));
  // Taking Current data into consideration
  const currentDate = new Date();
  //To get One day Data we have to subtract 24 hours from it
  currentDate.setHours(currentDate.getHours() - 24);
  dateBefore24hrs = currentDate.getTime();
  try {
    //Finding All the data of 24 hours
    const res = await Order.find({
      updatedAt: { $gt: dateBefore24hrs },
    }).populate("item");
    let transaction = 0,
      successfullTransaction = 0,
      volume = 0;
    // Storing the result in a object in desirable form
    const result = res.map((item, idx) => {
      transaction += 1;
      if (item.paid) successfullTransaction += 1;
      volume += item.amount;
      let accumulator = {};
      accumulator["sl_no"] = idx + 1;
      accumulator["order_id"] = item.order_id;
      accumulator["payment_id"] = item.payment_id;
      accumulator["createdAt"] = item.createdAt;
      accumulator["updateddAt"] = item.updatedAt;
      accumulator["item_id"] = item.item._id;
      accumulator["item_name"] = item.item.title;
      accumulator["coupon"] = item.coupon;
      accumulator["amount"] = item.amount;
      accumulator["paid_status"] = item.paid;
      accumulator["phone"] = item.phone;
      accumulator["email"] = item.email;
      accumulator["utm_params_source"] = item.utm_params.source;
      accumulator["utm_params_medium"] = item.utm_params.medium;
      accumulator["utm_params_campaign"] = item.utm_params.campaign;
      accumulator["utm_params_term"] = item.utm_params.term;
      return accumulator;
    });

    return { result, transaction, successfullTransaction, volume };
  } catch (error) {
    console.error(error.message);
  }
};
