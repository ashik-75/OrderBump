const processAutoBumpInput = (initialInput) => {
  const process = {
    ...initialInput,
    skipDisplay: initialInput?.skipDisplay || [],
    discountAmount: initialInput?.discountAmount
      ? Number(initialInput?.discountAmount)
      : null,
    discountType: initialInput?.discountType || [],
    multiVariants: initialInput?.fallbackProduct?.variants?.length > 1,
    selectedVariants:
      initialInput?.fallbackProduct?.variants?.map((variant) => {
        const dt = variant?.id?.split("/");
        return dt[dt.length - 1];
      }) || [],
    fallbackProductHandle: initialInput?.fallbackProduct?.handle || "",
    excludeProductsHandles: initialInput?.excludeProducts?.map((prod) => {
      return prod?.handle;
    }),
  };

  return process;
};

export default processAutoBumpInput;
