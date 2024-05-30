import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<React.StrictMode>
		<NextUIProvider>
			<App />
		</NextUIProvider>
	</React.StrictMode>,
);
