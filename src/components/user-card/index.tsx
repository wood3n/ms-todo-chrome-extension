import FoldIcon from "@/assets/fold.svg?react";
import { useUser } from "@/context";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";

function UserCard() {
  const user = useUser(state => state.user);

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          className="transition-transform"
          name={navigator.language.includes("zh") ? `${user?.surname || ""}${user?.givenName || ""}` : user?.displayName}
          description={(
            <div className="flex items-center gap-x-1">
              <span>{user?.mail}</span>
              <FoldIcon className="w-3 h-3" />
            </div>
          )}
          avatarProps={{
            isBordered: true,
            src: user?.avatar,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="signout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserCard;
