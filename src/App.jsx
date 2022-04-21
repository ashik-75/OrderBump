import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBump from "./pages/AddBump";
import Analytics from "./pages/Analytics";
import AutoBump from "./pages/AutoBump";
import BumpDetails from "./pages/BumpDetails";
import ManualBump from "./pages/ManualBump";
import Play from "./pages/Play";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

const queryClient = new QueryClient();

export default function App() {
  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY,
          host: new URL(location).searchParams.get("host"),
          forceRedirect: true,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <MyProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<ManualBump />} />
                <Route path="/auto-bump" element={<AutoBump />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route
                  path="/bumpDetails/:manualBumpId"
                  element={<BumpDetails />}
                />
                <Route path="/add-bump" element={<AddBump />} />
                <Route path="/play" element={<Play />} />
              </Routes>
            </MyProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
