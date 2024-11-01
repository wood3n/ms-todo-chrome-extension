import React, { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useIsAuthenticated } from "@azure/msal-react";

import Spin from "@/components/spin";
import { useTodoList, useUser } from "@/context";

import Home from "../home";

import "react-toastify/dist/ReactToastify.min.css";

const Main = () => {
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);
  const fetchUser = useUser(store => store.fetchUser);
  const initTodoList = useTodoList(store => store.initTodoList);

  const initData = async () => {
    try {
      setLoading(true);

      await fetchUser();
      await initTodoList();
    }
    finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (isAuthenticated) {
      initData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Spin loading={loading}>
      <Home />
      <ToastContainer
        theme="colored"
        autoClose={3000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick
        newestOnTop
        closeButton={false}
        className="left-auto right-2 top-6"
        toastClassName="rounded min-h-9"
        bodyClassName="rounded"
        style={{
          width: "60%",
        }}
      />
    </Spin>
  );
};

export default Main;
