/**
 * v0 by Vercel.
 * @see https://v0.dev/t/I0TQ08myFX2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import Link from "next/link"
import { Provider } from "../newchat/provider"

import { app } from "../page";
import { getDatabase, ref, push, set } from 'firebase/database';

// Function to create a user in the Firebase Realtime Database
const createUser = async (userId: String, email: String) => {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${userId}`);

    try {
        await set(userRef, {
            email: email,
            friends: {}, // Initially, the user has no friends
            messages: [] // Initially, the user has no messages
        });
        console.log('User created successfully!');
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

// Function to add a friend to a user
const addFriend = async (userId: String, friendId: String) => {
    const db = getDatabase();
    const userFriendsRef = ref(db, `users/${userId}/friends/${friendId}`);

    try {
        await set(userFriendsRef, true); // You can set any value to represent friendship
        console.log('Friend added successfully!');
    } catch (error) {
        console.error('Error adding friend:', error);
    }
};
interface Message {
    text: string;
    sender: string;
}


const addMessage = async (userId: string, message: Message) => {
    const db = getDatabase();
    const userMessagesRef = ref(db, `users/${userId}/messages`);

    try {
        // Push a new message object to the messages list
        const newMessageRef = push(userMessagesRef);
        const timestamp = Date.now();

        // Set the message details including timestamp and sender
        await set(newMessageRef, {
            text: message.text,
            sender: message.sender,
            timestamp: timestamp
        });

        console.log('Message added successfully!');
    } catch (error) {
        console.error('Error adding message:', error);
    }
};

// Usage example:
addMessage('userId1', { text: 'Hello friend!', sender: 'userId1' });

// Usage example:
createUser('userId1', 'user1@example.com');
addFriend('userId1', 'friendId1');
addMessage('userId1', { text: 'Hello friend!', sender: 'userId1'});

export default function ProfileOptions() {

    return (
        <Provider>

<p></p>
        </Provider>
    )
}
