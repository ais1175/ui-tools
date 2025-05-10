"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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
import type React from "react";

interface ThemePreviewProps {
	className?: string;
	style?: React.CSSProperties;
}

export function ThemePreview({ className = "", style }: ThemePreviewProps) {
	return (
		<div className={`space-y-6 ${className}`} style={style}>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Buttons</h4>
						<div className="flex flex-wrap gap-2">
							<Button>Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="destructive">Destructive</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Form Elements</h4>
						<div className="space-y-3">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Enter your name" />
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="terms" />
								<Label htmlFor="terms">Accept terms</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Switch id="airplane-mode" />
								<Label htmlFor="airplane-mode">Airplane Mode</Label>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Tabs & Accordion</h4>
						<Tabs defaultValue="account" className="w-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="password">Password</TabsTrigger>
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
								</Accordion>
							</TabsContent>
							<TabsContent value="password" className="mt-2 p-2">
								Password settings
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Radio & Slider</h4>
						<div className="space-y-3">
							<RadioGroup defaultValue="option-one">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="option-one" id="option-one" />
									<Label htmlFor="option-one">Option One</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="option-two" id="option-two" />
									<Label htmlFor="option-two">Option Two</Label>
								</div>
							</RadioGroup>
							<div className="space-y-1">
								<Label>Volume</Label>
								<Slider defaultValue={[50]} max={100} step={1} />
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] dark:border">
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

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Select & Dropdown</h4>
						<div className="space-y-3">
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Options</SelectLabel>
										<SelectItem value="option1">Option 1</SelectItem>
										<SelectItem value="option2">Option 2</SelectItem>
										<SelectItem value="option3">Option 3</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>

							<div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">Open Menu</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Copy</DropdownMenuItem>
										<DropdownMenuItem>Paste</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] md:col-span-2 dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Data Table</h4>
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Role</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>John Doe</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className="bg-green-500/20 text-green-700 hover:bg-green-500/20"
											>
												Active
											</Badge>
										</TableCell>
										<TableCell>Developer</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Jane Smith</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20"
											>
												Pending
											</Badge>
										</TableCell>
										<TableCell>Designer</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] md:col-span-2 dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Pagination</h4>
						<div className="flex justify-center">
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">1</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#" isActive>
											2
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</CardContent>
				</Card>

				<Card className="border-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_0px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] md:col-span-2 dark:border">
					<CardContent className="space-y-4 p-4">
						<h4 className="font-medium text-sm">Color Samples</h4>
						<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
							<div className="space-y-1.5">
								<div className="rounded-md bg-primary p-4 text-primary-foreground">
									Primary
								</div>
								<div className="text-xs">bg-primary</div>
							</div>
							<div className="space-y-1.5">
								<div className="rounded-md bg-secondary p-4 text-secondary-foreground">
									Secondary
								</div>
								<div className="text-xs">bg-secondary</div>
							</div>
							<div className="space-y-1.5">
								<div className="rounded-md bg-accent p-4 text-accent-foreground">
									Accent
								</div>
								<div className="text-xs">bg-accent</div>
							</div>
							<div className="space-y-1.5">
								<div className="rounded-md bg-muted p-4 text-muted-foreground">
									Muted
								</div>
								<div className="text-xs">bg-muted</div>
							</div>
						</div>
						<div className="mt-4 flex flex-wrap gap-2">
							<Badge>Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="outline">Outline</Badge>
							<Badge variant="destructive">Destructive</Badge>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
