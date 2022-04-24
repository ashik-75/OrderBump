import mongoose from "mongoose";

const orderBumpSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      default: "",
    },
    bumpLocation: {
      type: String,
      default: "",
    },
    displayAt: {
      type: String,
      default: "",
    },
    manualBumps: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ManualBump",
      },
    ],
    autoBump: {
      type: mongoose.Types.ObjectId,
      ref: "AutoBump",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const OrderBump =
  mongoose.models.OrderBump || mongoose.model("OrderBump", orderBumpSchema);

export default OrderBump;
