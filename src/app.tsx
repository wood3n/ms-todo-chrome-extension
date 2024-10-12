import { useEffect } from "react";

import { useMsal } from "@azure/msal-react";

import SignInButton from "@/components/signin-button";
import { useTodoList, useUser } from "@/context";

import Main from "./main";

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

  return <Main />;
}

export default App;
