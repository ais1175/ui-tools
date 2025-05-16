import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNewsLetter, { type ClientData } from "@/hooks/useNewsLetter";
import {
	DialogDescription,
	DialogPortal,
	DialogTitle,
} from "@radix-ui/react-dialog";
import { Lightbulb } from "lucide-react";
import React, { type FormEvent, useState } from "react";
import { toast } from "sonner";

function SendIdea() {
	const [Send, _cilentData] = useNewsLetter();
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const handleNewsLetterData = (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setIsOpen(true);
		const target = e.target as HTMLFormElement;
		const formData = new FormData(target);

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const clientEmail = formData.get("newsletter_email")!;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const clientMessage = formData.get("message")!;

		const data: ClientData = {
			email: clientEmail.toString(),
			message: clientMessage.toString(),
		};

		Send(data);
		toast.success("Thanks to subscribe to our newsletter");
		setIsLoading(false);
		setIsOpen(false);
	};
	return (
		<div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className="flex h-11 cursor-pointer gap-1 rounded-full bg-yellow-400 p-1 font-semibold text-foreground transition-all hover:bg-yellow-500 hover:p-0">
						<span className="flex items-center gap-1 rounded-full bg-white px-3 text-black">
							Submit Tool Idea
							<Lightbulb className="roate-12" />
						</span>
					</button>
				</DialogTrigger>
				<DialogContent className="border bg-main sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="font-semibold">Share your idea</DialogTitle>
						<DialogDescription>
							Let's make something great with your ideas💡
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={(e) => handleNewsLetterData(e)}
						className="relative z-2 h-full w-full space-y-2 "
					>
						<Input
							type="email"
							name="newsletter_email"
							className="col-span-5 border bg-card-bg px-2 py-3 outline-none focus:outline-none"
							placeholder="Your Email * "
							required
						/>{" "}
						<Textarea
							name="message"
							className="col-span-5 border bg-card-bg px-2 py-3 outline-none focus:outline-none"
							placeholder="Your Message * "
							required
						/>{" "}
						<button
							type="submit"
							className="flex w-full cursor-pointer justify-center gap-1 rounded-lg bg-primary p-3 font-semibold text-primary-foreground "
						>
							{isLoading ? "Submitting..." : "Submit"}
						</button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default SendIdea;
