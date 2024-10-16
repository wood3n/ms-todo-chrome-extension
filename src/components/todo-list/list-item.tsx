import { useState } from "react";
import type React from "react";

import { List as ListIcon, MoreTwo as MoreTwoIcon } from "@icon-park/react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

const ListItem: React.FC<Props> = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex h-8 items-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <ListIcon theme="outline" size={14} fill="#333" />
      <div className="ml-4 flex-1">{children}</div>
      <div className="h-full">
        {hovered && (
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" isIconOnly variant="light">
                <MoreTwoIcon theme="outline" size="14" fill="#333" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="todo list actions">
              <DropdownItem key="pin">固定到首页</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                删除
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default ListItem;
