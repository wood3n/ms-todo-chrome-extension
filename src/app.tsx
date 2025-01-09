import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

import { MsalProvider } from "@azure/msal-react";
import { NextUIProvider } from "@nextui-org/react";

import Error from "@/components/error";

import { msalInstance } from "./auth/ms-oauth";
import Login from "./pages/login";
import Main from "./pages/main";

import "./locales/index.ts";

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
        <RouterProvider router={router} />
      </NextUIProvider>
    </MsalProvider>
  );
}

export default App;
