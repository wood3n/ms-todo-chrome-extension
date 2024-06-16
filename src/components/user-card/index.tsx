import { useUser } from "@/context";
import { User } from "@nextui-org/react";

const UserCard = () => {
	const user = useUser((state) => state.user);

	return (
		<User
			name={
				navigator.language.includes("zh")
					? `${user?.surname || ""}${user?.givenName || ""}`
					: user?.displayName
			}
			description={user?.mail}
			avatarProps={{
				src: user?.avatar,
			}}
		/>
	);
};

export default UserCard;
