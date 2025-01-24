"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Input from "@/components/elements/form/input/Input";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useDashboardStore } from "@/stores/dashboard";
import { frontendBannerImageColumns } from "@/utils/constants";
import Button from "@/components/elements/base/button/Button";
import { useWalletStore } from "@/stores/user/wallet";
import { debounce } from "@/utils/throttle";
import Skeleton from "react-loading-skeleton";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

const HeroSection = () => {
  const { t } = useTranslation();
  const { isDark, profile } = useDashboardStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pnl, fetchPnl } = useWalletStore();
  const debounceFetchPnl = debounce(fetchPnl, 100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile && profile.firstName) {
      setLoading(true);
      setIsLoggedIn(true);
      debounceFetchPnl();
      setLoading(false);
    }
  }, [profile]);

  return (
    <section className="w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex flex-col md:flex-row items-center justify-center md:h-auto relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* Hero */}
      <div className="max-w-7xl relative pt-12 lg:pt-0 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="text-center md:text-left flex flex-col justify-center">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-10xl font-bold text-muted-800 dark:text-muted-200"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t("The Next Generation of")}{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {t("AI-Driven Blockchain Solutions")}
              </span>{" "}
              {t("on")} {siteName}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl text-muted-600 dark:text-muted-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t(
                "Embrace AI-Driven Crypto, Forex and Futures Trading All in 1."
              )}
            </motion.p>
            {isLoggedIn && pnl ? (
              <motion.div
                className="flex flex-col items-center md:items-start mt-5 space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h2 className="text-md font-bold text-muted-800 dark:text-muted-200">
                  {t("Your Estimated Balance")}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-semibold text-primary-500">
                    {pnl?.today ? (
                      `$${pnl.today?.toFixed(2)}`
                    ) : loading ? (
                      <Skeleton
                        width={60}
                        height={12}
                        baseColor={isDark ? "#27272a" : "#f7fafc"}
                        highlightColor={isDark ? "#3a3a3e" : "#edf2f7"}
                      />
                    ) : (
                      "$0.00"
                    )}
                  </span>
                </div>
                <div className="text-md text-green-500 flex gap-2 pb-5">
                  <div>{t("Today's PnL")}:</div>
                  {pnl?.today ? (
                    <>
                      {pnl.today > pnl.yesterday && pnl.yesterday !== 0 ? (
                        <span className="flex items-center gap-2 text-green-500">
                          <span>
                            +${(pnl.today - pnl.yesterday).toFixed(2)}
                          </span>
                          <span className="text-md">
                            (+
                            {pnl.yesterday !== 0
                              ? (
                                  ((pnl.today - pnl.yesterday) /
                                    pnl.yesterday) *
                                  100
                                ).toFixed(2)
                              : "0"}
                            %)
                          </span>
                        </span>
                      ) : pnl.today < pnl.yesterday ? (
                        <span className="flex items-center gap-2 text-red-500">
                          <span>
                            -${(pnl.yesterday - pnl.today).toFixed(2)}
                          </span>
                          <span className="text-md">
                            (-
                            {pnl.yesterday !== 0
                              ? (
                                  ((pnl.yesterday - pnl.today) /
                                    pnl.yesterday) *
                                  100
                                ).toFixed(2)
                              : 0}
                            %)
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-gray-500">
                          <span>$0.00</span>
                          <span className="text-md">(0.00%)</span>
                        </span>
                      )}
                    </>
                  ) : loading ? (
                    <Skeleton
                      width={60}
                      height={12}
                      baseColor={isDark ? "#27272a" : "#f7fafc"}
                      highlightColor={isDark ? "#3a3a3e" : "#edf2f7"}
                    />
                  ) : (
                    "$0.00"
                  )}
                </div>
                <div className="flex space-x-4">
                  <Link href="/user/wallet/deposit">
                    <Button
                      color="warning"
                      shape={"rounded-sm"}
                      variant={"outlined"}
                    >
                      {t("Deposit")}
                    </Button>
                  </Link>
                  <Link href="/user/wallet/withdraw">
                    <Button
                      color="muted"
                      shape={"rounded-sm"}
                      variant={"outlined"}
                    >
                      {t("Withdraw")}
                    </Button>
                  </Link>
                  <Link href="/market">
                    <Button
                      color="muted"
                      shape={"rounded-sm"}
                      variant={"outlined"}
                    >
                      {t("Trade")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="mt-8 flex justify-center md:justify-start items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="max-w-xs">
                    <Input
                      type="text"
                      placeholder={t("Enter your email")}
                      size={"lg"}
                      color={"contrast"}
                    />
                  </div>
                  <Link href="/register" className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-[7px] bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-md">
                      {t("Sign Up Now")}
                    </div>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
          {/* End Col */}
          <div
            className="w-full h-[20rem] sm:h-[30rem] lg:h-[35rem] overflow-hidden rounded-lg"
            style={{ perspective: "700px" }}
          >
            <div
              className="grid grid-cols-3 gap-12 w-[60rem] sm:w-[80rem] lg:w-[50rem] h-[55rem] md:h-[90rem] lg:h-[75rem] overflow-hidden origin-[50%_0%]"
              style={{
                transform:
                  "translate3d(7%, -2%, 0px) scale3d(0.9, 0.8, 1) rotateX(15deg) rotateY(-9deg) rotateZ(32deg)",
              }}
            >
              {Object.entries(frontendBannerImageColumns).map(
                ([key, images], colIndex) => (
                  <div
                    key={colIndex}
                    className={`grid gap-9 w-full h-[440px] ${
                      colIndex === 0
                        ? "animation-sliding-img-up-1"
                        : colIndex === 1
                          ? "animation-sliding-img-down-1"
                          : "animation-sliding-img-up-2"
                    }`}
                  >
                    {images.map((image, index) => (
                      <React.Fragment key={index}>
                        <img
                          className="w-full object-cover shadow-lg rounded-lg dark:shadow-neutral-900/80 dark:hidden border border-muted-200 dark:border-muted-800
            hover:border hover:border-primary-500 dark:hover:border dark:hover:border-primary-400 transition-all duration-300"
                          src={image.light}
                          alt={`Image ${index + 1}`}
                        />
                        <img
                          className="hidden w-full object-cover shadow-lg rounded-lg dark:shadow-neutral-900/80 dark:block border border-muted-200 dark:border-muted-800
            hover:border hover:border-primary-500 dark:hover:border dark:hover:border-primary-400 transition-all duration-300"
                          src={image.dark}
                          alt={`Image ${index + 1}`}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </section>
  );
};

export default HeroSection;
