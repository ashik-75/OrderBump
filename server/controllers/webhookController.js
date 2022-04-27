import expressAsyncHandler from "express-async-handler";

// TODO: demo
const line_items = [
  {
    id: "1234",
    properties: {
      bumpId: "9304",
    },
  },
];

export const createProduct = expressAsyncHandler(async (req, res) => {
  const shop = req.body?.order_status_url.split("/")[2];
  const line_items = req.body?.line_items;

  line_items.forEach(async (item) => {
    const bumpId = item.properties?.bumpId;

    // TODO: if properties have a bumpID
    if (bumpId) {
      const findBumpInOrderBump = await OrderBump.findOne({
        $or: [{ autoBump: bumpId }, { manualBumps: bumpId }],
      });

      // TODO: if bump find then update merchant used-orders
      if (findBumpInOrderBump) {
        const updatedMerchant = await MerchantData.findOneAndUpdate(
          { shop },
          {
            $inc: { usedOrders: 1 },
          },
          {
            new: true,
          }
        );
      }
      //! if bump find then update merchant used-orders (END)
    }
    //! if properties have a bumpID (END)
  });

  res.send("shopify request receive");
});
