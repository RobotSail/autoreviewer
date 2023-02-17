import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import { DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Flowbite>
      <Component {...pageProps} />;
    </Flowbite>
  );
};

export default api.withTRPC(MyApp);
