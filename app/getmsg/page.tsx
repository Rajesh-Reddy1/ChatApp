'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set, DataSnapshot, onValue } from 'firebase/database';
import { app } from '@/lib/data';
import { PlusIcon, SearchIcon, SettingsIcon, UserIcon } from "@/components/leftmenu";

export type Msg = {
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
};

const ChatApp = () => {
    const currentUser = '2';
    const [Users, setUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const db = getDatabase(app);
                const UsersRef = ref(db, 'Users');
                const snapshot = await get(UsersRef);
                if (snapshot.exists()) {
                    const UsersData = Object.keys(snapshot.val()).filter(user => user !== currentUser);
                    setUsers(UsersData);
                } else {
                    console.log('No Users found.');
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching Users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (!selectedUser) return;
                const db = getDatabase(app);
                const messagesRef = ref(db, `Users/${selectedUser}/msgs`);
                onValue(messagesRef, (snapshot: DataSnapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        let messagesArray: Msg[] = Object.values(data);
                        // Sort messages by timestamp (from old to new)
                        messagesArray.sort((a, b) => a.timestamp - b.timestamp);
                        setMessages(messagesArray);
                    } else {
                        setMessages([]);
                    }
                });
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
                                {Users.map((user, index) => (
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
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button
                                onClick={() => {
                                    if (!selectedUser) {
                                        console.error('No receiver selected');
                                        return;
                                    }

                                    const db = getDatabase(app);
                                    const msg_id = uuidv4();
                                    const sender = currentUser; // Assuming currentUser is defined in the component
                                    const receiver = selectedUser;
                                    const senderMsgRef = ref(db, `Users/${currentUser}/${receiver}/Msgs/${msg_id}`);
                                    const receiverMsgRef = ref(db, `Users/${receiver}/${currentUser}/Msgs/${msg_id}`);
                                    const msg: Msg = { sender: sender, receiver: receiver, content: content, timestamp: Date.now() };

                                    set(senderMsgRef, msg)
                                        .then(() => {
                                            console.log('Message sent successfully to sender');
                                            setContent('');
                                        })
                                        .catch((error) => {
                                            console.error('Error sending message to sender:', error);
                                        });

                                    set(receiverMsgRef, msg)
                                        .then(() => {
                                            console.log('Message sent successfully to receiver');
                                        })
                                        .catch((error) => {
                                            console.error('Error sending message to receiver:', error);
                                        });
                                }}
                            >
                                Send
                            </Button>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ChatApp;
