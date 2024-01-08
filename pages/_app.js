import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import store from "@/components/store/store";
import { Provider } from "react-redux";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
