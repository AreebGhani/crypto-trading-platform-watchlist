import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Link from "next/link";
import LogoText from "@/components/vector/LogoText";
import { Icon } from "@iconify/react";
import { useDashboardStore } from "@/stores/dashboard";
import { Tooltip } from "@/components/elements/base/tooltips/Tooltip";
import { Menu } from "./Menu";
import { SearchResults } from "../shared/SearchResults";
import AccountControls from "./AccountControls";

const TopNavbar = ({ trading, transparent }) => {
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();

  const {
    profile,
    isSidebarOpenedMobile,
    setIsSidebarOpenedMobile,
    isAdmin,
    activeMenuType,
    toggleMenuType,
    isFetched,
  } = useDashboardStore();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Bicrypto";

  return (
    <nav
      className={`relative z-11 ${
        !transparent &&
        "border-b border-muted-200 bg-white dark:border-muted-900 dark:bg-muted-900"
      }`}
      role="navigation"
      aria-label="main navigation"
    >
      <div
        className={`${
          transparent &&
          "fixed border-b border-muted-200 bg-white dark:border-muted-900 dark:bg-muted-900"
        } flex flex-col lg:flex-row min-h-[2.6rem] items-stretch justify-center w-full`}
      >
        <div className="flex justify-between items-center px-3">
          <Link
            className="relative flex shrink-0 grow-0 items-center rounded-[.52rem] px-3 py-2 no-underline transition-all duration-300"
            href="/"
          >
            <LogoText
              className={`max-w-[100px] w-[100px] text-muted-900 dark:text-white`}
            />
          </Link>

          <div className="flex items-center justify-center">
            {isSidebarOpenedMobile && isAdmin && isFetched && profile && (
              <div className="flex items-center justify-center lg:hidden">
                <Tooltip
                  content={activeMenuType === "admin" ? "Admin" : "User"}
                  position="bottom"
                >
                  <Icon
                    icon={"ph:user-switch"}
                    onClick={toggleMenuType}
                    className={`h-5 w-5 ${
                      activeMenuType === "admin"
                        ? "text-primary-500"
                        : "text-muted-400"
                    } transition-colors duration-300 cursor-pointer`}
                  />
                </Tooltip>
              </div>
            )}
            <div>
              <button
                type="button"
                className="relative ms-auto block h-[2.6rem] w-[2.6rem] cursor-pointer appearance-none border-none bg-none text-muted-400 lg:hidden"
                aria-label="menu"
                aria-expanded="false"
                onClick={() => {
                  setIsSidebarOpenedMobile(!isSidebarOpenedMobile);
                  setIsMobileSearchActive(false);
                }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[calc(50%-8px)] top-[calc(50%-6px)] block h-px w-4 origin-center bg-current transition-all duration-[86ms] ease-out ${
                    isSidebarOpenedMobile
                      ? "tranmuted-y-[5px] rotate-45"
                      : "scale-[1.1] "
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`absolute left-[calc(50%-8px)] top-[calc(50%-1px)] block h-px w-4 origin-center scale-[1.1] bg-current transition-all duration-[86ms] ease-out ${
                    isSidebarOpenedMobile ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`absolute left-[calc(50%-8px)] top-[calc(50%+4px)] block h-px w-4 origin-center scale-[1.1] bg-current transition-all duration-[86ms] ease-out  ${
                    isSidebarOpenedMobile
                      ? "-tranmuted-y-[5px] -rotate-45"
                      : "scale-[1.1] "
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-full  ${
            isMobileSearchActive ? "hidden" : "flex"
          } ${isSidebarOpenedMobile ? "flex-col items-start justify-start" : "items-center justify-center"}`}
        >
          <AccountControls
            isMobile={true}
            setIsMobileSearchActive={setIsMobileSearchActive}
          />
          <Menu />
        </div>
        {!trading && (
          <div
            className={`ms-0 lg:ms-10 lg:me-3 w-full items-center justify-center ${
              isMobileSearchActive ? "hidden lg:flex" : "hidden"
            }`}
          >
            <div className="relative text-base w-full">
              <input
                type="text"
                value={searchTerm}
                placeholder={`${t("Search")} ${siteName} ${t("components")}`}
                className="peer relative inline-flex h-10 w-full max-w-full items-center justify-start rounded-lg border border-muted-200 bg-white py-2 pe-3 ps-10 text-base leading-tight text-muted-500 outline-hidden outline-0 outline-offset-0 outline-current transition-all duration-300 placeholder:text-muted-300 focus-visible:shadow-lg focus-visible:shadow-muted-300/30 dark:border-muted-800 dark:bg-muted-950 dark:text-muted-300 dark:placeholder:text-muted-700 dark:focus-visible:shadow-muted-800/30"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchTerm(event.currentTarget.value);
                }}
              />

              <div className="absolute left-0 top-0 z-1 flex h-10 w-10 items-center justify-center transition-colors duration-300">
                <Icon
                  icon="lucide:search"
                  className="h-4 w-4 text-muted-400 transition-colors duration-300"
                />
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setIsMobileSearchActive(false);
                }}
                className="absolute right-0 top-0 z-1 flex h-10 w-10 items-center justify-center transition-colors duration-300"
              >
                <Icon
                  icon="lucide:x"
                  className="h-4 w-4 text-muted-400 transition-colors duration-300"
                />
              </button>

              <SearchResults searchTerm={searchTerm} id="mobile" />
            </div>
          </div>
        )}

        <AccountControls
          isMobile={false}
          setIsMobileSearchActive={setIsMobileSearchActive}
        />
      </div>
    </nav>
  );
};

export default TopNavbar;
