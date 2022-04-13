import mongoose from "mongoose";

const bumpSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    handle: String,
    prepurchase: Boolean,
    postpurchase: Boolean,
    product: Object,
    multivariants: Boolean,
    selectedvariants: Array,
    conditions: Array,
    selectedvariants: Array,
  },
  {
    timestamps: true,
  }
);

const Bump = mongoose.models.Bump || mongoose.model("Bump", bumpSchema);

export default Bump;
