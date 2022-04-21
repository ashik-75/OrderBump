import mongoose from "mongoose";

const manualBumpSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    handle: String,
    prePurchase: Boolean,
    postPurchase: Boolean,
    product: Object,
    multiVariants: Boolean,
    selectedVariants: Array,
    conditions: Array,
    orderBump: {
      type: String,
      ref: "OrderBump",
    },
  },
  {
    timestamps: true,
  }
);

const ManualBump =
  mongoose.models.ManualBump || mongoose.model("ManualBump", manualBumpSchema);

export default ManualBump;
