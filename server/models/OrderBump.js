import mongoose from "mongoose";

const orderBumpSchema = new mongoose.Schema(
  {
    shopUrl: {
      type: String,
      default: "",
    },
    bumpLocation: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: false,
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
