import { useAppBridge } from "@shopify/app-bridge-react";
import { Layout, Page, PageActions } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import AutoBumpHead from "../components/AutoBumpHead";
import AutoBumpOffer from "../components/AutoBumpOffer";
import AutoBumpProducts from "../components/AutoBumpProducts";
import AutoBumpSettings from "../components/AutoBumpSettings";
import AutoBumpSkeleton from "../components/AutoBumpSkeleton";
import processAutoBumpInput from "../customFunction/processAutoBumpInput";
import useAddAutoBump from "../hooks/useAddAutoBump";
import useGetOrderBump from "../hooks/useGetOrderBump";
import useUpdateAutoBump from "../hooks/useUpdateAutoBump";

const AutoBump = () => {
  const app = useAppBridge();
  // TODO: Update Button State
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  // TODO: AutoBump Setting State (Whole)
  const [settingsInfo, setSettingsInfo] = useState({
    skipDisplay: "",
    backup: false,
    prePurchase: false,
    postPurchase: false,
    discountAmount: null,
    discountType: "",
    fallbackProduct: null,
    fallbackProductHandle: "",
    selectedVariants: [],
    multiVariants: false,
    excludeProducts: [],
    excludeProductsHandles: [],
  });

  // TODO: Get OrderBump
  const { data, isLoading, isError, isSuccess } = useGetOrderBump();

  // TODO: Create AutoBump
  const { mutate, isLoading: isAddLoading } = useAddAutoBump();

  const saveDataToServer = () => {
    const processedInput = processAutoBumpInput(settingsInfo);
    mutate({ info: processedInput, app });
  };

  // ? Update AutoBump
  const { mutate: updateMutate, isLoading: isUpdateLoading } =
    useUpdateAutoBump();

  const updateAutoBumpToServer = () => {
    const processedInput = processAutoBumpInput(settingsInfo);
    updateMutate({
      autoBumpId: data?.data?.autoBump?._id,
      info: processedInput,
      app,
    });
  };

  // TODO : Side Effect On UI

  useEffect(() => {
    if (data?.data?.autoBump && isSuccess) {
      setSettingsInfo(data?.data?.autoBump);
    }
  }, [data]);

  return isUpdateLoading || isAddLoading || isLoading ? (
    <AutoBumpSkeleton />
  ) : (
    <Page
      primaryAction={{
        content: data?.data?.autoBump ? "Update" : "Save",
        disabled: isDisableBtn,
        onAction: data?.data?.autoBump
          ? updateAutoBumpToServer
          : saveDataToServer,
      }}
    >
      <Layout>
        <Layout.Section>
          <AutoBumpHead />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpSettings
            setSettingsInfo={setSettingsInfo}
            settingsInfo={settingsInfo}
            setIsDisableBtn={setIsDisableBtn}
          />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpOffer
            setSettingsInfo={setSettingsInfo}
            settingsInfo={settingsInfo}
            setIsDisableBtn={setIsDisableBtn}
          />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpProducts
            setSettingsInfo={setSettingsInfo}
            settingsInfo={settingsInfo}
            setIsDisableBtn={setIsDisableBtn}
          />
        </Layout.Section>
      </Layout>

      <br />

      <PageActions
        primaryAction={{
          content: data?.data?.autoBump ? "Update" : "Save",
          disabled: isDisableBtn,
          onAction: data?.data?.autoBump
            ? updateAutoBumpToServer
            : saveDataToServer,
        }}
      />
    </Page>
  );
};

export default AutoBump;
