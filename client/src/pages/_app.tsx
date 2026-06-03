import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect, useState } from "react";

import "@/styles/globals.css";


import { DM_Sans } from "next/font/google";

import Preloader from "@/components/Preloader";
import ErrorBoundary from "@/components/ErrorBoundary";

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

  return (
    <ErrorBoundary>
      <>
        {showPreloader && <Preloader />}
        <div lang={"en"} className={dmSans.className}>
          <Component {...pageProps} />
        </div>
      </>
    </ErrorBoundary>
  );
};

export default MyApp;
