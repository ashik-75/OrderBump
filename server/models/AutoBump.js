import mongoose from "mongoose";

const AutoBumpSchema = new mongoose.Schema(
  {
    skipDisplay: Array,
    backup: Boolean,
    prePurchase: Boolean,
    postPurchase: Boolean,
    discountAmount: Number,
    discountType: Array,
    fallbackProduct: Object,
    fallbackProductHandle: String,
    selectedVariants: Array,
    multiVariants: Boolean,
    excludeProducts: Array,
    excludeProductsHandles: Array,
  },
  {
    timestamps: true,
  }
);

const AutoBump =
  mongoose.models.AutoBump || mongoose.model("AutoBump", AutoBumpSchema);

export default AutoBump;
