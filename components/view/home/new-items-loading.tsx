import Link from "next/link";
import React, { useEffect, useState } from "react";

const newComponent = [
	{
		href: "/components/r3f-blob",
		title: "R3F Blob",
	},
];

function NewItemsLoading() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % newComponent.length);
		}, 3000); // Adjust the time (in ms) for how long each item stays

		return () => clearInterval(interval);
	}, []); // No need to include newComponent.length as a dependency

	return (
		<>
			{newComponent.map((item, index) => (
				<React.Fragment key={item.href}>
					{activeIndex === index && (
						<a
							href={item?.href}
							className="mx-auto inline-flex w-fit items-center gap-1 rounded-full border-4 bg-[#334cec] py-0.5 pr-3 pl-0.5 text-xs shadow-[#6175f8] "
						>
							<div className="rounded-full bg-[#fcfdff] px-2 py-1 text-black text-xs ">
								Update
							</div>
							<p className="inline-block text-white text-xs sm:text-base">
								✨ Introducing
								<span className="px-1 font-semibold">{item.title}</span>
							</p>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
								className="h-3 w-3 text-white"
							>
								<path
									fillRule="evenodd"
									d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					)}
				</React.Fragment>
			))}
		</>
	);
}

export default NewItemsLoading;
