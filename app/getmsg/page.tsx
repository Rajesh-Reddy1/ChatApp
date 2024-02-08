'use client'
// // import React, { useState, useEffect } from 'react';
// // import { getDatabase, ref, get, push, set } from 'firebase/database';
// // import { v4 as uuidv4 } from 'uuid';
// // import { app } from '@/lib/data';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// // import moment from 'moment'
import Link from "next/link";

// // interface Message {
// //     sender: string;
// //     receiver: string;
// //     content: string;
// //     timestamp: number;
// // }



// // const ChatApp = () => {
// //     const [users, setUsers] = useState<string[]>([]);
// //     const [selectedUser, setSelectedUser] = useState<string | null>(null);
// //     const [messages, setMessages] = useState<Msg[]>([]);

// //     useEffect(() => {
// //         const fetchUsers = async () => {
// //             try {
// //                 const db = getDatabase(app);
// //                 const usersRef = ref(db, 'users');
// //                 const snapshot = await get(usersRef);
// //                 if (snapshot.exists()) {
// //                     const usersData = Object.keys(snapshot.val());
// //                     setUsers(usersData);
// //                 } else {
// //                     console.log('No users found.');
// //                     setUsers([]);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching users:', error);
// //             }
// //         };

// //         fetchUsers();
// //     }, []);

// //     useEffect(() => {
// //         const fetchMessages = async () => {
// //             try {
// //                 if (!selectedUser) return;
// //                 const db = getDatabase(app);
// //                 const messagesRef = ref(db, `users/${selectedUser}/msgs`);
// //                 const snapshot = await get(messagesRef);
// //                 if (snapshot.exists()) {
// //                     const messagesData: Msg[] = Object.values(snapshot.val());
// //                     setMessages(messagesData);
// //                 } else {
// //                     console.log(`No messages found for user: ${selectedUser}`);
// //                     setMessages([]);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching messages:', error);
// //             }
// //         };

// //         fetchMessages();
// //     }, [selectedUser]);

// //     return (
// //         <div className="flex h-screen">
// //             <div className="w-1/4 border-r">
// //                 <h2 className="text-xl font-bold p-4">Users</h2>
// //                 <ul className="divide-y">
// //                     {users.map((user, index) => (
// //                         <li key={index} onClick={() => setSelectedUser(user)} className={`p-2 cursor-pointer ${user === selectedUser ? 'bg-gray-200' : ''}`}>
// //                             {user}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>
// //             <div className="flex-1 overflow-auto">
// //                 <h2 className="text-xl font-bold p-4">Messages {selectedUser && `from ${selectedUser}`}</h2>
// //                 <ul className="divide-y">
// //                     {messages.map((message, index) => (
// //                         <li key={index} className="p-2 flex items-center gap-2">
// //                             <div className="text-lg font-medium leading-none truncate">{message.sender === selectedUser ? message.sender : message.receiver}</div>
// //                             <div className="text-md font-medium leading-none truncate">- {message.content}</div><p className="text-xs">{moment(message.timestamp).fromNow()}</p>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ChatApp;
// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, get } from 'firebase/database';
// import { app } from '@/lib/data';

// export type Msg = {
//     sender: string;
//     receiver: string;
//     content: string;
//     timestamp: number;
// };

// const ChatApp = () => {
//     const [users, setUsers] = useState<string[]>([]);
//     const [selectedUser, setSelectedUser] = useState<string | null>(null);
//     const [messages, setMessages] = useState<Msg[]>([]);
//     const currentUser = 'NV'; // Assuming the logged-in user is 'NV'

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const db = getDatabase(app);
//                 const usersRef = ref(db, 'users');
//                 const snapshot = await get(usersRef);
//                 if (snapshot.exists()) {
//                     const usersData = Object.keys(snapshot.val()).filter(user => user !== currentUser);
//                     setUsers(usersData);
//                 } else {
//                     console.log('No users found.');
//                     setUsers([]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 if (!selectedUser) return;
//                 const db = getDatabase(app);
//                 const currentUserMessagesRef = ref(db, `users/${currentUser}/msgs`);
//                 const selectedUserMessagesRef = ref(db, `users/${selectedUser}/msgs`);

//                 const currentUserSnapshot = await get(currentUserMessagesRef);
//                 const selectedUserSnapshot = await get(selectedUserMessagesRef);

//                 const currentUserMessages: Msg[] = currentUserSnapshot.exists() ? Object.values(currentUserSnapshot.val()) : [];
//                 const selectedUserMessages: Msg[] = selectedUserSnapshot.exists() ? Object.values(selectedUserSnapshot.val()) : [];

//                 const filteredMessages = currentUserMessages.concat(selectedUserMessages).filter((message: Msg) =>
//                     (message.sender === currentUser && message.receiver === selectedUser) ||
//                     (message.sender === selectedUser && message.receiver === currentUser)
//                 );

//                 setMessages(filteredMessages);
//             } catch (error) {
//                 console.error('Error fetching messages:', error);
//             }
//         };

//         fetchMessages();
//     }, [selectedUser]);


//     return (
//         <>
//             <div className="flex h-screen">
//                 <div className="w-1/4 border-r">
//                     <h2 className="text-xl font-bold p-4 border-b-2">Users</h2>
//                     <ul className="divide-y">
//                         {users.map((user, index) => (
//                             <li key={index} onClick={() => setSelectedUser(user)} className={`p-2 cursor-pointer ${user === selectedUser ? 'bg-gray-200' : ''}`}>
//                                 {user}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div key="1" className="flex flex-col h-full w-full border rounded-lg">
//                     <h2 className="text-xl font-bold p-7 border-b-2">{selectedUser && `Messages with ${selectedUser}`}</h2>
//                     <div className="flex flex-col rounded-lg">
//                         <div className="flex-1 grid gap-2 px-2 py-1">
//                             {messages.map((message, index) => (
//                                 <div key={index} className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
//                                     <div className={`p-2 rounded-lg ${message.sender === currentUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'}`}>
//                                         {message.content}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );

// }

// export default ChatApp;
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '@/lib/data';
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { MoonIcon, PlusIcon, SearchIcon, SettingsIcon, UserIcon } from "../profile/page";
export type Msg = {
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
};

const ChatApp = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<Msg[]>([]);
    const currentUser = 'NV'; // Assuming the logged-in user is 'NV'

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const db = getDatabase(app);
                const usersRef = ref(db, 'users');
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const usersData = Object.keys(snapshot.val()).filter(user => user !== currentUser);
                    setUsers(usersData);
                } else {
                    console.log('No users found.');
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (!selectedUser) return;
                const db = getDatabase(app);
                const currentUserMessagesRef = ref(db, `users/${currentUser}/msgs`);
                const selectedUserMessagesRef = ref(db, `users/${selectedUser}/msgs`);

                const currentUserSnapshot = await get(currentUserMessagesRef);
                const selectedUserSnapshot = await get(selectedUserMessagesRef);

                const currentUserMessages: Msg[] = currentUserSnapshot.exists() ? Object.values(currentUserSnapshot.val()) : [];
                const selectedUserMessages: Msg[] = selectedUserSnapshot.exists() ? Object.values(selectedUserSnapshot.val()) : [];

                const filteredMessages = currentUserMessages.concat(selectedUserMessages).filter((message: Msg) =>
                    (message.sender === currentUser && message.receiver === selectedUser) ||
                    (message.sender === selectedUser && message.receiver === currentUser)
                );

                setMessages(filteredMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedUser]);


    return (
        <>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
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
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <Link
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    New Chat
                                </Link>
                                {users.map((user, index) => (
                                    <Link
                                        key={index}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                        href="#"
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <UserIcon className="h-4 w-4" />
                                        {user}
                                    </Link>
                                ))}
                            </nav>
                        </div>

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

                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                        <div className="flex items-center">
                            <h1 className="font-semibold text-lg md:text-2xl">{selectedUser}</h1>
                        </div>
                        <div className="border shadow-sm rounded-lg">
                            <div className="flex flex-col gap-4 p-4">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex items-start gap-4 ${message.sender === currentUser ? 'ml-auto' : ''}`}>
                                        {message.sender !== currentUser && <UserIcon className="h-6 w-6" />}
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none ">{message.sender}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{message.content}</p>
                                        </div>
                                        {message.sender === currentUser && <UserIcon className="h-6 w-6" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-auto flex items-center gap-4 w-full">
                            <Input
                                className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
                                placeholder="Type a message..."
                                type="text"
                            />
                            <Button>Send</Button>
                        </div>
                    </main>

                </div>
            </div>
        </>
    );
}

export default ChatApp;
