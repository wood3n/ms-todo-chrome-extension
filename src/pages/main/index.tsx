import React, { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@azure/msal-react";

import Spin from "@/components/spin";
import { useTodoList, useUser } from "@/context";

import Home from "../home";

const Main = () => {
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);
  const fetchUser = useUser(store => store.fetchUser);
  const fetchTodoList = useTodoList(store => store.fetchTodoList);

  const initData = async () => {
    try {
      setLoading(true);

      await fetchUser();
      await fetchTodoList();
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
    </Spin>
  );
};

export default Main;
