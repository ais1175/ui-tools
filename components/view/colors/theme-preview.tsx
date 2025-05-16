"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
	ArrowRight,
	ArrowUp,
	Calendar,
	ChevronLeft,
	ChevronRight,
	CreditCard,
	Github,
	LineChart,
	Minus,
	Plus,
	Send,
	User,
	Users,
} from "lucide-react";
import { useState } from "react";

interface ThemePreviewProps {
	className?: string;
	style?: React.CSSProperties;
}

export function ThemePreview({ className = "", style }: ThemePreviewProps) {
	const [currentMonth] = useState("June 2023");

	return (
		<div className={`space-y-6 ${className}`} style={style}>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{/* Activity Goal Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="font-medium text-sm">Move Goal</CardTitle>
						<div className="text-muted-foreground text-xs">
							Set your daily activity goal
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col items-center justify-center space-y-2">
							<div className="flex items-center">
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 rounded-full"
								>
									<Minus className="h-4 w-4" />
								</Button>
								<div className="mx-4 text-center">
									<div className="font-bold text-3xl">350</div>
									<div className="text-muted-foreground text-xs">
										CALORIES/DAY
									</div>
								</div>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8 rounded-full"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>

							<div className="mt-2 h-[60px] w-full">
								<div className="flex h-full items-end justify-between gap-1">
									{[0.6, 0.8, 0.7, 0.9, 0.6, 0.7, 0.8, 0.9, 0.7, 0.8].map(
										(height, i) => (
											<div
												key={i}
												className="w-3 rounded-sm bg-primary/80"
												style={{ height: `${100 * height}%` }}
											/>
										),
									)}
								</div>
							</div>

							<Button className="mt-2 w-full">Set Goal</Button>
						</div>
					</CardContent>
				</Card>
				{/* Chat Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<Avatar className="h-8 w-8">
								<AvatarImage src="/diverse-person-portrait.png" />
								<AvatarFallback>SD</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="font-medium text-sm">
									Sofia Davis
								</CardTitle>
								<div className="text-muted-foreground text-xs">
									sd@example.com
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="rounded-md bg-muted/50 p-2 text-sm">
							Hi, how can I help you today?
						</div>

						<div className="ml-auto max-w-[80%] rounded-md bg-primary/10 p-2 text-sm">
							Hey, I'm having trouble with my account.
						</div>

						<div className="rounded-md bg-muted/50 p-2 text-sm">
							What seems to be the problem?
						</div>

						<div className="ml-auto max-w-[80%] rounded-md bg-primary/10 p-2 text-sm">
							I can't log in.
						</div>

						<div className="mt-4 flex">
							<Input
								placeholder="Type your message..."
								className="rounded-r-none"
							/>
							<Button className="rounded-l-none">
								<Send className="h-4 w-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
				{/* Payment Method Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="font-medium text-sm">
							Payment Method
						</CardTitle>
						<div className="text-muted-foreground text-xs">
							Add a new payment method to your account
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-3 gap-2">
							<Button
								variant="outline"
								className="flex h-20 flex-col items-center justify-center"
							>
								<CreditCard className="mb-1 h-6 w-6" />
								<span className="text-xs">Card</span>
							</Button>
							<Button
								variant="outline"
								className="flex h-20 flex-col items-center justify-center"
							>
								<svg className="mb-1 h-6 w-6" viewBox="0 0 24 24">
									<title>paypal</title>
									<path
										d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
										fill="currentColor"
									/>
								</svg>
								<span className="text-xs">PayPal</span>
							</Button>
							<Button
								variant="outline"
								className="flex h-20 flex-col items-center justify-center"
							>
								<svg className="mb-1 h-6 w-6" viewBox="0 0 24 24">
									<title>apple</title>
									<path
										d="M17.285 0c-1.8 0-3.61.745-4.885 2.076-1.29-1.284-3.064-2.076-5.025-2.076C3.342 0 0 3.355 0 7.5c0 4.17 3.01 7.823 6.115 10.233 2.263 1.76 4.599 3.076 6.285 3.267 1.686-.19 4.022-1.507 6.285-3.267C21.99 15.323 25 11.67 25 7.5c0-4.145-3.342-7.5-7.715-7.5z"
										fill="currentColor"
									/>
								</svg>
								<span className="text-xs">Apple</span>
							</Button>
						</div>

						<div className="space-y-2">
							<Label htmlFor="card-name">Name</Label>
							<Input id="card-name" placeholder="First Last" />
						</div>

						<div className="space-y-2">
							<Label htmlFor="card-number">Card number</Label>
							<Input id="card-number" placeholder="1234 5678 9012 3456" />
						</div>

						<div className="grid grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label>Expires</Label>
								<Select defaultValue="month">
									<SelectTrigger>
										<SelectValue placeholder="Month" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="month">Month</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label>Year</Label>
								<Select defaultValue="year">
									<SelectTrigger>
										<SelectValue placeholder="Year" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="year">Year</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="cvc">CVC</Label>
								<Input id="cvc" placeholder="CVC" />
							</div>
						</div>

						<Button className="w-full">Continue</Button>
					</CardContent>
				</Card>

				{/* Create Account Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="font-medium text-lg">
							Create an account
						</CardTitle>
						<div className="text-muted-foreground text-sm">
							Enter your email below to create your account
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-2">
							<Button variant="outline" className="w-full">
								<Github className="mr-2 h-4 w-4" />
								GitHub
							</Button>
							<Button variant="outline" className="w-full">
								<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
									<title>github</title>
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
									<path d="M1 1h22v22H1z" fill="none" />
								</svg>
								Google
							</Button>
						</div>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-card px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" placeholder="m@example.com" />
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" />
						</div>

						<Button className="w-full">
							Create account
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</CardContent>
				</Card>

				{/* Report Issue Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="font-medium text-lg">
							Report an issue
						</CardTitle>
						<div className="text-muted-foreground text-sm">
							What area are you having problems with?
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="area">Area</Label>
								<Select defaultValue="billing">
									<SelectTrigger>
										<SelectValue placeholder="Select area" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="billing">Billing</SelectItem>
										<SelectItem value="account">Account</SelectItem>
										<SelectItem value="technical">Technical</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="severity">Security Level</Label>
								<Select defaultValue="2">
									<SelectTrigger>
										<SelectValue placeholder="Select severity" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">Severity 1</SelectItem>
										<SelectItem value="2">Severity 2</SelectItem>
										<SelectItem value="3">Severity 3</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="subject">Subject</Label>
							<Input id="subject" placeholder="I need help with..." />
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								placeholder="Please include all information relevant to your issue."
								className="min-h-[100px]"
							/>
						</div>

						<div className="flex justify-between">
							<Button variant="outline">Cancel</Button>
							<Button>Submit</Button>
						</div>
					</CardContent>
				</Card>
				{/* Payments Table */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="font-medium text-sm">Payments</CardTitle>
						<div className="text-muted-foreground text-xs">
							Manage your payments
						</div>
					</CardHeader>
					<CardContent>
						<div className="overflow-hidden rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Status</TableHead>
										<TableHead>Email</TableHead>
										<TableHead className="text-right">Amount</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<Badge
												variant="outline"
												className="bg-green-500/20 text-green-700 hover:bg-green-500/20"
											>
												Success
											</Badge>
										</TableCell>
										<TableCell>ken99@example.com</TableCell>
										<TableCell className="text-right">$316.00</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Badge
												variant="outline"
												className="bg-green-500/20 text-green-700 hover:bg-green-500/20"
											>
												Success
											</Badge>
										</TableCell>
										<TableCell>abe45@example.com</TableCell>
										<TableCell className="text-right">$242.00</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Badge
												variant="outline"
												className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20"
											>
												Processing
											</Badge>
										</TableCell>
										<TableCell>monserrat44@example.com</TableCell>
										<TableCell className="text-right">$837.00</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
				{/* Revenue Card */}
				<Card className="shadow-xl">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Combobox</h4>
						<div className="flex justify-center">
							<Command className="rounded-lg border shadow-md">
								<CommandInput placeholder="Type a command or search..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									<CommandGroup heading="Suggestions">
										<CommandItem>Calendar</CommandItem>
										<CommandItem>Search</CommandItem>
										<CommandItem>Settings</CommandItem>
									</CommandGroup>
									<CommandSeparator />
									<CommandGroup heading="Actions">
										<CommandItem>New File</CommandItem>
										<CommandItem>New Project</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</div>
					</CardContent>
				</Card>
				{/* Tabs & Accordion */}
				<Card className="shadow-xl">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Tabs & Accordion</h4>
						<Tabs defaultValue="account" className="w-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="button">Buttons</TabsTrigger>
							</TabsList>
							<TabsContent value="account" className="mt-2 p-2">
								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="item-1">
										<AccordionTrigger>Profile</AccordionTrigger>
										<AccordionContent>
											Manage your profile information and preferences.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-2">
										<AccordionTrigger>Notifications</AccordionTrigger>
										<AccordionContent>
											Control your notification settings.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-3">
										<AccordionTrigger>Settings</AccordionTrigger>
										<AccordionContent>
											Control your profile settings.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</TabsContent>
							<TabsContent value="button" className="mt-2 p-2">
								<div className="flex flex-wrap gap-2">
									<Button>Primary</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="destructive">Destructive</Button>
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
				{/* Calendar Card */}
				<Card className="shadow-xl">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="font-medium text-sm">
							<Calendar className="mr-2 inline h-4 w-4" />
							{currentMonth}
						</CardTitle>
						<div className="flex items-center space-x-2">
							<Button variant="ghost" size="icon" className="h-6 w-6">
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon" className="h-6 w-6">
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-7 gap-1 text-center text-xs">
							<div className="text-muted-foreground">Su</div>
							<div className="text-muted-foreground">Mo</div>
							<div className="text-muted-foreground">Tu</div>
							<div className="text-muted-foreground">We</div>
							<div className="text-muted-foreground">Th</div>
							<div className="text-muted-foreground">Fr</div>
							<div className="text-muted-foreground">Sa</div>

							{/* Calendar days */}
							{Array.from({ length: 31 }, (_, i) => {
								const day = i + 1;
								const isToday = day === 13;
								const isSelected = day === 5;

								return (
									<div key={i} className="py-1">
										<div
											className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs ${
												isToday ? "bg-primary text-primary-foreground" : ""
											}
                      ${
												isSelected
													? "bg-secondary text-secondary-foreground"
													: ""
											}
                      ${!isToday && !isSelected ? "hover:bg-muted" : ""}
                    `}
										>
											{day}
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
				{/* Team Members Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center font-medium text-sm">
							<Users className="mr-2 h-4 w-4" />
							Team Members
						</CardTitle>
						<div className="text-muted-foreground text-xs">
							Invite your team members to collaborate
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
							<div className="flex items-center gap-2">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/diverse-person-portrait.png" />
									<AvatarFallback>SD</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium text-sm">Sofia Davis</div>
									<div className="text-muted-foreground text-xs">
										sd@example.com
									</div>
								</div>
							</div>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<User className="h-4 w-4" />
							</Button>
						</div>

						<div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
							<div className="flex items-center gap-2">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/diverse-person-portrait.png" />
									<AvatarFallback>JL</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium text-sm">Jackson Lee</div>
									<div className="text-muted-foreground text-xs">
										jl@example.com
									</div>
								</div>
							</div>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<User className="h-4 w-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
				{/* Analytics Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center font-medium text-sm">
							<LineChart className="mr-2 h-4 w-4" />
							Exercise Minutes
						</CardTitle>
						<div className="text-muted-foreground text-xs">
							Your exercise minutes are ahead of where you normally are
						</div>
					</CardHeader>
					<CardContent>
						<div className="relative h-[100px] w-full">
							{/* Line chart */}
							<svg className="h-full w-full">
								<title>line chart</title>
								<path
									d="M0,80 C20,70 40,30 60,20 C80,10 100,50 120,60 C140,70 160,40 180,30 C200,20 220,60 240,70"
									fill="none"
									stroke="hsl(var(--primary))"
									strokeWidth="2"
									className="w-full"
								/>
								<path
									d="M0,90 C20,85 40,80 60,85 C80,90 100,80 120,75 C140,70 160,80 180,85 C200,90 220,80 240,75"
									fill="none"
									stroke="hsl(var(--primary)/0.3)"
									strokeWidth="2"
									className="w-full"
								/>

								{/* Dots on the line */}
								<circle cx="0" cy="80" r="3" fill="hsl(var(--primary))" />
								<circle cx="60" cy="20" r="3" fill="hsl(var(--primary))" />
								<circle cx="120" cy="60" r="3" fill="hsl(var(--primary))" />
								<circle cx="180" cy="30" r="3" fill="hsl(var(--primary))" />
								<circle cx="240" cy="70" r="3" fill="hsl(var(--primary))" />

								<circle cx="0" cy="90" r="3" fill="hsl(var(--primary)/0.3)" />
								<circle cx="60" cy="85" r="3" fill="hsl(var(--primary)/0.3)" />
								<circle cx="120" cy="75" r="3" fill="hsl(var(--primary)/0.3)" />
								<circle cx="180" cy="85" r="3" fill="hsl(var(--primary)/0.3)" />
								<circle cx="240" cy="75" r="3" fill="hsl(var(--primary)/0.3)" />
							</svg>
						</div>
					</CardContent>
				</Card>

				{/* Cookie Settings Card */}
				<Card className="shadow-xl">
					<CardHeader className="pb-2">
						<CardTitle className="font-medium text-sm">
							Cookie Settings
						</CardTitle>
						<div className="text-muted-foreground text-xs">
							Manage your cookie settings here
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-sm">Strictly Necessary</Label>
								<div className="text-muted-foreground text-xs">
									These cookies are essential in order to use the website and
									use its features.
								</div>
							</div>
							<Switch checked disabled />
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-sm">Functional Cookies</Label>
								<div className="text-muted-foreground text-xs">
									These cookies allow the website to provide personalized
									functionality.
								</div>
							</div>
							<Switch defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-sm">Performance Cookies</Label>
								<div className="text-muted-foreground text-xs">
									These cookies help to improve the performance of the website.
								</div>
							</div>
							<Switch />
						</div>

						<Button className="w-full">Save preferences</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
