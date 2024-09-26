import { Spinner } from "@nextui-org/react";
import clx from "classnames";
import type React from "react";

interface Props {
	children: React.ReactNode;
	loading?: boolean;
	className?: string;
}

const Spin: React.FC<Props> = ({ loading, children, className }) => {
	return (
		<div className={clx("relative", className)}>
			{loading && (
				<div className="w-full h-full absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center opacity-60 select-none pointer-events-none">
					<Spinner />
				</div>
			)}
			<div
				className={clx({
					"bg-blue-200 opacity-50 rounded-lg select-none pointer-events-none h-full":
						loading,
				})}
			>
				{children}
			</div>
		</div>
	);
};

export default Spin;
