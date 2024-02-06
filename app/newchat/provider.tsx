
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LeftMenu from "@/components/leftmenu";
interface ProviderProps {
    children: ReactNode;
}

export function Provider({ children}:ProviderProps) {
    return (
        <div key="1" className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                            <UserIcon className="h-6 w-6" />
                            <span className="">My Profile</span>
                        </Link>
                        <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                            <SettingsIcon className="h-4 w-4" />
                            <span className="sr-only">Settings</span>
                        </Button>
                    </div>
                    <LeftMenu />
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link className="lg:hidden" href="#">
                        <UserIcon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                                    placeholder="Search messages..."
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                                size="icon"
                                variant="ghost"
                            >
                                <img
                                    alt="Avatar"
                                    className="rounded-full"
                                    height="32"
                                    src="/placeholder.svg"
                                    style={{
                                        aspectRatio: "32/32",
                                        objectFit: "cover",
                                    }}
                                    width="32"
                                />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                {children}
            </div>
        </div>
    )
}



function PlusIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}


function SearchIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function SettingsIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


export function UserIcon(props:any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}