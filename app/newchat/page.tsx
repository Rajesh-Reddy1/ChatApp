'use client'
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '@/lib/data';



type Message = {
    id: string;
    sender: string;
    receiver: string;
    content: string;
    timestamp: string;
};
type UserMessages = {
    [key: string]: Message[];
};

const Messages = () => {
    const currentUser = '1'; // Replace with the current user's ID
    const [userMessages, setUserMessages] = useState<UserMessages>({});

    useEffect(() => {
        const db = getDatabase(app);
        const usersRef = ref(db, `/Users/${currentUser}`);
        onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedUserMessages: UserMessages = {};
                for (let user in data) {
                    const userMsgs = [];
                    for (let id in data[user].Msgs) {
                        userMsgs.push({ id, ...data[user].Msgs[id] });
                    }
                    loadedUserMessages[user] = userMsgs;
                }
                setUserMessages(loadedUserMessages);
            }
        });
    }, []);

    return (
        <div>
            {Object.keys(userMessages).map((user) => (
                <div key={user}>
                    <h2>Messages with {user}</h2>
                    {userMessages[user].map((message) => (
                        <div key={message.id}>
                            <p>Content: {message.content}</p>
                            <p>Receiver: {message.receiver}</p>
                            <p>Sender: {message.sender}</p>
                            <p>Timestamp: {message.timestamp}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Messages;
