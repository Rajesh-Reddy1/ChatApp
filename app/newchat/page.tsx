'use client'

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, set, push, onValue } from 'firebase/database';// Import your UserIcon component
import { PlusIcon, SearchIcon, SettingsIcon, UserIcon } from '@/components/leftmenu';
import Link from 'next/link';
import { app } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';

type Message = {
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
};

type UserMessages = {
    [key: string]: Message[];
};

const ChatApp = () => {
    const currentUser = '3'; // Replace with the current user's ID
    const [Users, setUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [userMessages, setUserMessages] = useState<UserMessages>({});
    const [content, setContent] = useState<string>("");
    const messages = userMessages[selectedUser || ''];

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
                const usersRef = ref(db, `/Users/${currentUser}`);
                onValue(usersRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const loadedUserMessages: UserMessages = {};
                        for (let user in data) {
                            let userMsgs = [];
                            for (let id in data[user].Msgs) {
                                userMsgs.push({ id, ...data[user].Msgs[id] });
                            }
                            // Sort messages by timestamp
                            userMsgs.sort((a, b) => a.timestamp - b.timestamp);
                            loadedUserMessages[user] = userMsgs;
                        }
                        setUserMessages(loadedUserMessages);
                    }
                });
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedUser]);

    const sendMessage = async () => {
        if (!content.trim()) return;

        const newMessage: Message = {
            sender: currentUser,
            receiver: selectedUser || '',
            content: content,
            timestamp: Date.now(),
        };

        try {
            const db = getDatabase(app);
            const messagesRef = ref(db, `Users/${currentUser}/${selectedUser}/Msgs`);
            const newMessageRef = push(messagesRef);
            await set(newMessageRef, newMessage);
            setContent('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


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
                                        <UserIcon className="h-5 w-5" />
                                        <span className="">{user}</span>
                                    </Link>
                                ))}
                            </nav>

                        </div>
                    </div>

                </div>

                <div className="flex flex-col flex-1 ">
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
                        <h1 className="font-semibold text-lg md:text-2xl">Chats With {selectedUser}</h1>
                    </div>
                        <div className="border shadow-sm rounded-lg">
                            <div className="flex flex-col gap-4 p-6 overflow-y-auto" style={{ maxHeight: '720px' }}>
                                {messages && messages.map((message, index) => (
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
                                className="flex-1 bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
                                placeholder="Type a message..."
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button
                                className="h-10 w-10"
                                size="icon"
                                variant="outline"
                                onClick={sendMessage}   >
                                <SendIcon className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </div>
                    </main>

                </div>

            </div>

        </>
    );

};

export default ChatApp;
