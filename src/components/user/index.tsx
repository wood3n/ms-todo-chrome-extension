import { useNavigate } from "react-router-dom";

import { Logout } from "@icon-park/react";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User as UserChip } from "@nextui-org/react";

import { useUser } from "@/context";
import { StorageKey, storageRm } from "@/utils/storage";
import { RefreshTokenAlarmName } from "@/utils/token-alarm";

function User() {
  const user = useUser(store => store.user);
  const navigate = useNavigate();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar isBordered src={user?.avatar} className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem>
          <UserChip
            name={user?.preferredLanguage === "zh-CN" ? `${user?.surname ?? ""}${user?.givenName ?? ""}` : user?.displayName ?? "unknown"}
            description={user?.mail}
            avatarProps={{
              src: user?.avatar,
            }}
          />
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          startContent={<Logout theme="outline" />}
          onClick={async () => {
            await storageRm([StorageKey.AccessToken, StorageKey.RefreshToken]);

            await chrome.alarms.clear(RefreshTokenAlarmName);

            navigate("/login");
          }}
        >
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default User;
