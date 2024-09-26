import SignInButton from "@/components/signin-button";
import { useTodoList, useUser } from "@/context";
import { useMsal } from "@azure/msal-react";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Home from "./home";
import "./background";
import "./app.css";

function App() {
  const msalInstance = useMsal();
  const acount = msalInstance.instance.getActiveAccount();

  const fetchUser = useUser(state => state.fetchUser);
  const fetchTodoList = useTodoList(state => state.fetchTodoList);

  useEffect(() => {
    if (acount) {
      fetchUser();

      fetchTodoList();
    }
  }, [acount, fetchUser, fetchTodoList]);

  if (!acount) {
    return <SignInButton />;
  }

  return (
    <NextUIProvider locale={navigator.language} className="w-full h-full">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Home />
      </ErrorBoundary>
    </NextUIProvider>
  );
}

export default App;
