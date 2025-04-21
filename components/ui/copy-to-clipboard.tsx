import { cn } from "@/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "./button";

type CopyProps = {
	text: string;
	classname?: string;
};

const CopyToClipboard: React.FC<CopyProps> = ({ text, classname }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Button
			onClick={copyToClipboard}
			size="icon"
			variant="outline"
			className={cn(
				"absolute top-1.5 right-1.5 z-10 grid h-8 w-8 place-content-center border-0",
				classname,
			)}
		>
			{copied ? <CheckCheck /> : <Copy />}
		</Button>
	);
};

export default CopyToClipboard;
