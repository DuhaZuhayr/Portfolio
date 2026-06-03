import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";

import Preloader from "@/components/Preloader";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let scroll: any;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default();
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <div lang={"en"} className={dmSans.className} data-scroll-container>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
