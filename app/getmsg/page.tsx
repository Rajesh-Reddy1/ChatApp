'use client'
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, push, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { app } from '@/lib/data';

interface Message {
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
}

export type Msg = {
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
};

function MessageList() {
    const [rajMessages, setRajMessages] = useState<Msg[]>([]);

    useEffect(() => {
        const fetchRajMessages = async () => {
            try {
                const db = getDatabase(app);
                const rajRef = ref(db, 'users/Raj/msgs');
                const snapshot = await get(rajRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const rajMessagesData: Msg[] = Object.values(data);
                    setRajMessages(rajMessagesData);
                } else {
                    console.log('No messages found for Raj.');
                    setRajMessages([]);
                }
            } catch (error) {
                console.error('Error fetching Raj messages:', error);
            }
        };

        fetchRajMessages();
    }, []);

    return (
        <div>
            <h2>Messages sent by Raj</h2>
            <ul>
                {rajMessages.map((message, index) => (
                    <li key={index}>
                        {message.content} - {new Date(message.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MessageList;

