import React, { useState, useEffect } from "react";
import Layout from "@/layouts/Default";
import { useTranslation } from "next-i18next";
import $fetch from "@/utils/api";
import Card from "@/components/elements/base/card/Card";
import Input from "@/components/elements/form/input/Input";
import Button from "@/components/elements/base/button/Button";
import IconBox from "@/components/elements/base/iconbox/IconBox";
import Alert from "@/components/elements/base/alert/Alert";
import { debounce } from "lodash";
import { BackButton } from "@/components/elements/base/button/BackButton";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const BlockchainDetails = () => {
  const { t } = useTranslation();
  const [updateData, setUpdateData] = useState({
    status: false,
    version: "",
    release_date: "",
    changelog: null,
    update_id: "",
    message: "",
  });
  const router = useRouter();
  const { productId } = router.query as {
    productId: string;
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const [purchaseCode, setPurchaseCode] = useState("");
  const [envatoUsername, setEnvatoUsername] = useState("");
  const [blockchainName, setBlockchainName] = useState(null);
  const [blockchainChain, setBlockchainChain] = useState(null);
  const [blockchainVersion, setBlockchainVersion] = useState("");
  const [blockchainStatus, setBlockchainStatus] = useState(false);
  const [licenseVerified, setLicenseVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch blockchain details
  const fetchBlockchainData = async () => {
    const { data, error } = await $fetch({
      url: `/api/admin/ext/ecosystem/blockchain/${productId}`,
      silent: true,
    });
    if (!error) {
      setBlockchainVersion(data.version);
      setBlockchainName(data.name);
      setBlockchainChain(data.chain);
      setBlockchainStatus(data.status);
    }
  };

  const debouncedFetchBlockchainData = debounce(fetchBlockchainData, 100);

  useEffect(() => {
    if (router.isReady) {
      debouncedFetchBlockchainData();
    }
  }, [router.isReady]);

  // Reverify license
  const reVerifyLicense = async () => {
    const { data, error } = await $fetch({
      url: `/api/admin/system/license/verify`,
      method: "POST",
      silent: true,
      body: { productId },
    });
    if (!error) {
      setLicenseVerified(data.status);
    } else {
      setLicenseVerified(false);
    }
  };

  useEffect(() => {
    if (productId && blockchainName) {
      reVerifyLicense();
    }
  }, [productId, blockchainName]);

  // Check for updates
  const checkForUpdates = async () => {
    setIsLoading(true);
    const { data, error } = await $fetch({
      url: `/api/admin/system/update/check`,
      method: "POST",
      body: { productId, currentVersion: blockchainVersion },
      silent: true,
    });
    if (!error) {
      setUpdateData(data);
      setUpdateData((prevState) => ({
        ...prevState,
        message: data.message,
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (licenseVerified && blockchainVersion) {
      checkForUpdates();
    }
  }, [licenseVerified, blockchainVersion]);

  // Update blockchain system
  const updateBlockchain = async () => {
    setIsUpdating(true);
    const { error } = await $fetch({
      url: `/api/admin/system/update/download`,
      method: "POST",
      body: {
        productId,
        updateId: updateData.update_id,
        version: updateData.version,
        product: blockchainName,
        type: "blockchain",
      },
    });
    if (!error) {
      setBlockchainVersion(updateData.version);
    }
    setIsUpdating(false);
  };

  // Activate or deactivate blockchain
  const handleActivateBlockchain = async () => {
    setIsSubmitting(true);
    const { data, error } = await $fetch({
      url: `/api/admin/ext/ecosystem/blockchain/${productId}/status`,
      method: "PUT",
      body: { status: !blockchainStatus },
    });
    if (!error) {
      setBlockchainStatus(!blockchainStatus);
    }
    setIsSubmitting(false);
  };

  const activateLicenseAction = async () => {
    setIsSubmitting(true);
    const { data, error } = await $fetch({
      url: `/api/admin/system/license/activate`,
      method: "POST",
      body: { productId, purchaseCode, envatoUsername },
    });
    if (!error) {
      setLicenseVerified(data.status);
    }
    setIsSubmitting(false);
  };

  return (
    <Layout title={t("Blockchain Details")} color="muted">
      <div className="flex justify-between items-center w-full mb-5 text-muted-800 dark:text-muted-200">
        <h1 className="text-xl">{blockchainChain}</h1>
        <div className="flex gap-2">
          {/* if version > 0.0.1 show enable */}
          {blockchainVersion !== "0.0.1" && (
            <Button
              color={blockchainStatus ? "danger" : "success"}
              onClick={handleActivateBlockchain}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              <Icon
                icon={blockchainStatus ? "carbon:close" : "carbon:checkmark"}
                className="mr-2 h-5 w-5"
              />
              {blockchainStatus ? t("Disable") : t("Enable")}
            </Button>
          )}
          <BackButton href={"/admin/ext/ecosystem"} />
        </div>
      </div>

      {!licenseVerified ? (
        <div className="flex justify-center items-center w-full h-[70vh]">
          <div className="flex flex-col justify-center items-center w-full max-w-5xl px-4 text-center">
            <h1 className=" text-muted-800 dark:text-muted-200">
              {t("Verify your license")}
            </h1>
            <Card className="mt-8 p-5 max-w-md space-y-5">
              <Input
                value={purchaseCode}
                onChange={(e) => setPurchaseCode(e.target.value)}
                type="text"
                label={t("Purchase Code")}
                placeholder={t("Enter your purchase code")}
              />
              <Input
                value={envatoUsername}
                onChange={(e) => setEnvatoUsername(e.target.value)}
                type="text"
                label={t("Envato Username")}
                placeholder={t("Enter your Envato username")}
              />
              <Button
                color="primary"
                className="w-full"
                onClick={activateLicenseAction}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {t("Activate License")}
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-[70vh]">
              <div className="text-center space-y-5 flex flex-col gap-5 items-center justify-center">
                <IconBox
                  size="xl"
                  shape="full"
                  color="info"
                  icon="svg-spinners:blocks-shuffle-3"
                />
                <h1 className="text-2xl font-bold">
                  {t("Checking for updates")}...
                </h1>
                <p>{t("Please wait while we check for updates")}.</p>
              </div>
            </div>
          ) : (
            <div className="text-start max-w-2xl space-y-5">
              {updateData.status && (
                <Alert
                  color="info"
                  icon="material-symbols-light:info-outline"
                  canClose={false}
                  className="text-md"
                >
                  {t(
                    "Please backup your database and blockchain files before upgrading"
                  )}
                  .
                </Alert>
              )}
              <Alert canClose={false} color={"success"} className="text-md">
                {updateData.message}
              </Alert>
              {updateData.status && (
                <Card className="p-5 space-y-5">
                  <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                    {t("Update Notes")}
                  </span>
                  <div
                    className="pl-5 prose dark:prose-dark text-muted-800 dark:text-muted-200 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: updateData.changelog || "",
                    }}
                  />
                  <Button
                    onClick={updateBlockchain}
                    color="success"
                    className="w-full"
                    type="submit"
                    disabled={updateData.update_id === "" || isUpdating}
                    loading={isUpdating}
                  >
                    {blockchainVersion === "0.0.1" ? t("Install") : t("Update")}
                  </Button>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BlockchainDetails;
export const permission = "Access Blockchain Management";
