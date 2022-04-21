const processOutput = (manualBumpInfo) => {
  const finalData = {
    ...manualBumpInfo,
    multiVariants: manualBumpInfo?.product
      ? manualBumpInfo?.product?.selection[0]?.variants?.length > 1
      : false,
    handle: manualBumpInfo?.product
      ? manualBumpInfo?.product?.selection[0]?.handle
      : "",
    selectedVariants: manualBumpInfo?.product
      ? manualBumpInfo?.product?.selection[0]?.variants?.map((dt) => {
          const arr = dt?.id?.split("/");
          const length = arr.length;
          return arr[length - 1];
        })
      : [],
  };
  return finalData;
};

export default processOutput;
