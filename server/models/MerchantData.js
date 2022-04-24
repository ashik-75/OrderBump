import mongoose from "mongoose";

const LIMIT = 20;
const USED_ORDERS = 15;

const merchantDataSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      default: "",
    },
    services: Array,
    subscription: Array,
    limit: {
      type: Number,
      default: LIMIT,
    },
    usedOrders: {
      type: Number,
      default: USED_ORDERS,
    },
    warrantyProduct: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const MerchantData =
  mongoose.models.MerchantData ||
  mongoose.model("MerchantData", merchantDataSchema);

export default MerchantData;
