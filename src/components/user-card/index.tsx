import { User } from "@nextui-org/react";

import { useUser } from "@/context";
import { getLocalDate } from "@/utils/date";

function UserCard() {
  const user = useUser(state => state.user);

  return (
    <User
      as="button"
      className="transition-transform"
      name={navigator.language.includes("zh") ? `Hi, ${user?.surname || ""}${user?.givenName || ""}` : `Hi, ${user?.displayName || "-"}`}
      description={getLocalDate()}
      avatarProps={{
        src: user?.avatar,
        size: "sm",
      }}
    />
  );
}

export default UserCard;
