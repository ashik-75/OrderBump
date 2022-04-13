const processOutput = (bumpInfo) => {
  const finalData = {
    ...bumpInfo,
    multivariants: bumpInfo?.product
      ? bumpInfo?.product?.selection[0]?.variants?.length > 1
      : false,
    handle: bumpInfo?.product ? bumpInfo?.product?.selection[0]?.handle : "",
    selectedvariants: bumpInfo?.product
      ? bumpInfo?.product?.selection[0]?.variants?.map((dt) => {
          const arr = dt?.id?.split("/");
          const length = arr.length;
          return arr[length - 1];
        })
      : [],
  };
  return finalData;
};

export default processOutput;
