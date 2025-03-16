import { MsalProvider } from "@azure/msal-react";
import { NextUIProvider } from "@nextui-org/react";
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

import Error from "@/components/error";

import { msalInstance } from "./auth/ms-oauth";
import Login from "./pages/login";
import Main from "./pages/main";
import ThemeProvider from "./theme";

import "./locales/index.ts";

import "overlayscrollbars/overlayscrollbars.css";
import "./app.css";

const router = createMemoryRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <NextUIProvider locale={navigator.language} className="size-full">
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </NextUIProvider>
    </MsalProvider>
  );
}

export default App;
