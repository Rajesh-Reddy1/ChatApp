'use client'
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface ProviderProps {
    children: ReactNode;
}
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';

interface FriendsListProps {
    userId: string;
    onFriendClick: (friendId: string) => void;
}


interface FriendsListProps {
    userId: string;
    onFriendClick: (friendId: string) => void;
}

function FriendsList({ userId, onFriendClick }: FriendsListProps) {
    const [friends, setFriends] = useState<string[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const db = getDatabase();
                const userFriendsRef = ref(db, `users/${userId}/friends`);
                const snapshot = await get(userFriendsRef);
                if (snapshot.exists()) {
                    const friendsData: { [key: string]: unknown } = snapshot.val();
                    const friendsList = Object.keys(friendsData);
                    setFriends(friendsList as string[]); // Type assertion
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [userId]);

    return (
        <div>
            <h2>Friends List</h2>
            <ul>
                {friends.map((friendId) => (
                    <li key={friendId} onClick={() => onFriendClick(friendId)}>
                        {friendId}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Messages({ userId, friendId }: { userId: string; friendId: string }) {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const db = getDatabase();
                const messagesRef = ref(db, `messages/${userId}-${friendId}`);
                const snapshot = await get(messagesRef);
                if (snapshot.exists()) {
                    const messagesData: unknown[] = Object.values(snapshot.val());
                    setMessages(messagesData.map((message: unknown) => message as string)); // Type assertion
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [userId, friendId]);

    return (
        <div>
            <h2>Messages with {friendId}</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
    const userId = 'userId1'; // Assume user is logged in

    const handleFriendClick = (friendId: string) => {
        setSelectedFriend(friendId);
    };

    return (
        <div>
            <h1>Chat App</h1>
            <FriendsList userId={userId} onFriendClick={handleFriendClick} />
            {selectedFriend && (
                <Messages userId={userId} friendId={selectedFriend} />
            )}
        </div>
    );
}

export default App;




// export function Provider({ children }: ProviderProps) {
//     return (
//         <div key="1" className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
//             <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
//                 <div className="flex h-full max-h-screen flex-col gap-2">
//                     <div className="flex h-[60px] items-center border-b px-6">
//                         <Link className="flex items-center gap-2 font-semibold" href="#">
//                             <UserIcon className="h-6 w-6" />
//                             <span className="">My Profile</span>
//                         </Link>
//                         <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
//                             <SettingsIcon className="h-4 w-4" />
//                             <span className="sr-only">Settings</span>
//                         </Button>
//                     </div>
//                     <LeftMenu />
//                 </div>
//             </div>
//             <div className="flex flex-col">
//                 <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
//                     <Link className="lg:hidden" href="#">
//                         <UserIcon className="h-6 w-6" />
//                         <span className="sr-only">Home</span>
//                     </Link>
//                     <div className="w-full flex-1">
//                         <form>
//                             <div className="relative">
//                                 <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//                                 <Input
//                                     className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
//                                     placeholder="Search messages..."
//                                     type="search"
//                                 />
//                             </div>
//                         </form>
//                     </div>
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button
//                                 className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
//                                 size="icon"
//                                 variant="ghost"
//                             >
//                                 <img
//                                     alt="Avatar"
//                                     className="rounded-full"
//                                     height="32"
//                                     src="/placeholder.svg"
//                                     style={{
//                                         aspectRatio: "32/32",
//                                         objectFit: "cover",
//                                     }}
//                                     width="32"
//                                 />
//                                 <span className="sr-only">Toggle user menu</span>
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>Settings</DropdownMenuItem>
//                             <DropdownMenuItem>Support</DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>Logout</DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </header>
//                 {children}
//             </div>
//         </div>
//     )
// }



