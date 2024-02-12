'use client'
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { app } from '@/lib/data';

type Message = {
    Sender: string;
    Receiver: string;
    Content: string;
    Timestamp: string;
};

// 
const db = getDatabase(app);

const App = () => {
    const [users, setUsers] = useState<{ [key: string]: { Msgs: { [key: string]: Message } } }>({});
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const usersRef = ref(db, 'Users');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data);
        });
    }, []);

    const sendMessage = async (sender: string, receiver: string, content: string) => {
        const timestamp = new Date().toISOString();
        const msg = { Sender: sender, Receiver: receiver, Content: content, Timestamp: timestamp };

        try {
            // Save message under sender
            const senderRef = ref(db, `Users/${sender}/${receiver}/Msgs`);
            await push(senderRef, msg);

            // Save message under receiver
            const receiverRef = ref(db, `Users/${receiver}/${sender}/Msgs`);
            await push(receiverRef, msg);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };




    return (
        <div>
            <input type="text" placeholder="Sender" value={sender} onChange={e => setSender(e.target.value)} />
            <input type="text" placeholder="Receiver" value={receiver} onChange={e => setReceiver(e.target.value)} />
            <input type="text" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <button onClick={() => sendMessage(sender, receiver, content)}>Send Message</button>

            {users && Object.keys(users).map((user) => (
                <div key={user}>
                    <h2>{user}</h2>
                    {Object.values(users[user].Msgs || {}).map((msg: Message, index) => (
                        <p key={index}>{msg.Content}</p>
                    ))}
                </div>
            ))}

        </div>
    );
};

export default App;
