"use client";

import { Button } from "@/components/ui/button";
import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";
interface CodeTab {
	value: string;
	label: string;
	code: string;
	description: string;
}

interface CopyCodeProps {
	tabs: CodeTab[];
	defaultTab?: string;
}

export function CopyCode({ tabs, defaultTab }: CopyCodeProps) {
	const [activeTab, setActiveTab] = useState<string>(
		defaultTab || tabs[0].value,
	);

	const copyToClipboard = (text: string, description: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${description} copied to clipboard`, {
			duration: 2000,
		});
	};

	return (
		<div className=" flex w-fit items-center px-2 ">
			<CopyToClipboard
				text={tabs[1].code}
				classname="relative top-0 h-10 w-10 bg-card-bg"
			/>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" size="sm" className="h-10 bg-card-bg">
						Show Code
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[40rem]">
					<DialogHeader>
						<DialogTitle>Copy Code</DialogTitle>
						<DialogDescription>
							Copy the code to your clipboard.
						</DialogDescription>
					</DialogHeader>
					<div className="grid w-full gap-4 py-4">
						<div
							className={
								"inset-shadow-[0_1px_rgb(0_0_0/0.10)] z-[2] ml-auto h-[95%] w-full rounded-lg bg-card-bg p-4 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]"
							}
						>
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList>
									{tabs.map((tab) => (
										<TabsTrigger key={tab.value} value={tab.value}>
											{tab.label}
										</TabsTrigger>
									))}
								</TabsList>

								{tabs.map((tab) => (
									<TabsContent
										key={tab.value}
										value={tab.value}
										className="mt-2"
									>
										<div className="relative">
											<Button
												variant="ghost"
												size="icon"
												className="absolute top-2 right-2 z-10"
												onClick={() =>
													copyToClipboard(tab.code, tab.description)
												}
											>
												<Copy className="h-4 w-4" />
											</Button>
											<pre className="max-h-96 overflow-auto rounded-xl bg-main p-4 text-xs">
												{tab.code}
											</pre>
										</div>
									</TabsContent>
								))}
							</Tabs>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
