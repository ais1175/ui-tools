"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
		thumbClassName?: string;
	}
>(({ className, thumbClassName, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"pointer-events-none relative block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
				thumbClassName,
			)}
		>
			<div className="absolute top-0 right-0 bottom-0 left-0 rounded-full bg-[linear-gradient(to_right,#0707072d_1px,transparent_1px),linear-gradient(to_bottom,#0000002d_1px,transparent_1px)] bg-[size:1px_2px] dark:bg-[linear-gradient(to_right,#ffffff4b_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d497_1px,transparent_1px)] " />
		</SwitchPrimitives.Thumb>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
