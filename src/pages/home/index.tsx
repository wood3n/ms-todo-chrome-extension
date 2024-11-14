import React from "react";

import Header from "@/pages/home/header";

import TaskList from "./task-list";

const Home = () => {
  return (
    <div className="flex h-full flex-col space-y-2 p-1">
      <Header className="h-auto flex-none" />
      <TaskList className="min-h-0 grow overflow-auto" />
    </div>
  );
};

export default Home;
