"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Header from "../components/home/Header";
import Main from "../components/home/Main";
import Footer from "../components/home/Footer";

declare global {
  interface Window {
    jQuery?: any;
  }
}

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScripts = async () => {
      if (typeof window === "undefined") return;

      const loadScript = (src: string) =>
        new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            console.log(`${src} loaded`);
            resolve();
          };
          script.onerror = () =>
            reject(new Error(`Failed to load script: ${src}`));
          document.body.appendChild(script);
        });

      try {
        await loadScript("https://code.jivosite.com/widget/pWkKXxy5af");
        await loadScript("/assetz/js/vendor/jquery-3.6.0.min.js");
        console.log("jQuery loaded");

        if (window.jQuery) {
          console.log("jQuery is available");

          const scripts = [
            "/assetz/js/bootstrap.min.js",
            "/assetz/js/slick.min.js",
            "/assetz/js/jquery.odometer.min.js",
            "/assetz/js/jquery.knob.min.js",
            "/assetz/js/jquery-countdowngampang.min.js",
            "/assetz/js/jquery.ba-throttle-debounce.min.js",
            "/assetz/js/jquery.mCustomScrollbar.min.js",
            "/assetz/js/jarallax.min.js",
            "/assetz/js/jquery.appear.js",
            "/assetz/js/jquery.easing.js",
            "/assetz/js/wow.min.js",
            "/assetz/js/main.js",
            "/assetz/js/jquery.countdown.min.js",
            "https://www.livecoinwatch.com/static/lcw-widget.js",
            "/assetz/js/custom.js",
          ];

          for (const src of scripts) {
            await loadScript(src);
          }
          console.log("All scripts loaded");
        } else {
          console.error("jQuery not found or not initialized");
        }
      } catch (error) {
        console.error("Error loading scripts:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    loadScripts();
  }, []);

  return (
    <>
      <Head>
        <title>Acrypto Cloud | Home of Trading</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Acrypto Cloud is a cryptocurrency trading platform created by and for people. It is a trustworthy and safe way to purchase, sell, and exchange cryptocurrency with cheap fees and unrivaled liquidity."
        />
        <meta name="keywords" content="crypto,ecosystem, bot, token-ico, mlm" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/assetz/img/favicon.png"
        />
        <link rel="stylesheet" href="/assetz/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assetz/css/animate.min.css" />
        <link rel="stylesheet" href="/assetz/css/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/assetz/css/mCustomScrollbar.min.css" />
        <link rel="stylesheet" href="/assetz/css/odometer.css" />
        <link rel="stylesheet" href="/assetz/css/slick.css" />
        <link rel="stylesheet" href="/assetz/css/default.css" />
        <link rel="stylesheet" href="/assetz/css/style.css" />
        <link rel="stylesheet" href="/assetz/css/responsive.css" />
      </Head>

      {loading && (
        <div className="fixed inset-0 bg-[#030B15] z-[9999] flex justify-center items-center">
          <div className="text-lg text-white">
            <Icon
              icon="mingcute:loading-3-line"
              className="animate-spin mr-2 h-12 w-12"
            />
          </div>
        </div>
      )}

      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Index;
