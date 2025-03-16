import { Card } from "@nextui-org/react";
import React from "react";

import Header from "@/pages/home/header";

import TaskList from "./task-list";

const Home = () => {
  return (
    <Card className="flex h-full flex-col">
      <div className="p-1">
        <Header />
      </div>
      <div className="min-h-0 grow overflow-auto p-1">
        <TaskList />
      </div>
    </Card>
  );
};

export default Home;
