import { useNavigate } from "react-router-dom";

import { Logout } from "@icon-park/react";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, User as UserChip } from "@nextui-org/react";

import { launchWebAuthFlow } from "@/auth/chrome-identity";
import { getLoginOutUrl } from "@/auth/ms-oauth";
import AsyncButton from "@/components/async-button";
import { useUser } from "@/context";
import { clearBadge } from "@/utils/badge";

function User() {
  const user = useUser(store => store.user);
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
            onClick={onOpen}
          >
            退出登录
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">退出登录？</ModalHeader>
              <ModalFooter>
                <AsyncButton
                  color="danger"
                  onPress={async () => {
                    await chrome.alarms.clearAll();

                    const logoutUrl = await getLoginOutUrl();

                    await launchWebAuthFlow(logoutUrl);

                    clearBadge();

                    onClose();

                    navigate("/login");
                  }}
                >
                  确认
                </AsyncButton>
                <Button color="primary" onPress={onClose}>
                  取消
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default User;
