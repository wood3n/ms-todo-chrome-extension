import { Logout } from "@icon-park/react";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, User as UserChip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { launchWebAuthFlow } from "@/auth/chrome-identity";
import { getLoginOutUrl } from "@/auth/ms-oauth";
import AsyncButton from "@/components/async-button";
import { useUser } from "@/context";

import ThemeSwitch from "./theme-switch";

function User() {
  const user = useUser(store => store.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Avatar isBordered src={user?.avatar} className="cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="userInfo">
            <UserChip
              name={user?.preferredLanguage === "zh-CN" ? `${user?.surname ?? ""}${user?.givenName ?? ""}` : user?.displayName ?? "unknown"}
              description={user?.mail}
              avatarProps={{
                src: user?.avatar,
              }}
            />
          </DropdownItem>
          <DropdownItem key="toggleMode">
            <ThemeSwitch />
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<Logout theme="outline" />}
            onClick={onOpen}
          >
            {t("signOut")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t("confirmSignOut")}</ModalHeader>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t("cancel")}
                </Button>
                <AsyncButton
                  color="danger"
                  onPress={async () => {
                    await chrome.alarms.clearAll();

                    const logoutUrl = await getLoginOutUrl();

                    await launchWebAuthFlow(logoutUrl);

                    await chrome.alarms.clearAll();

                    onClose();

                    navigate("/login");
                  }}
                >
                  {t("confirm")}
                </AsyncButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default User;
