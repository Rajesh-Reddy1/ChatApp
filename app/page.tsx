'use client'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
import Router from 'next/router';


// export default function Component() {
//   return (

//     <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
//         <h2 className="text-3xl font-bold text-center dark:text-gray-100">Login</h2>
//         <div className="space-y-4">
//           <div className="relative">
//             <PersonStandingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
//             <Input className="pl-10" id="username" placeholder="Username" required type="text" />
//           </div>
//           <div className="relative">
//             <MailboxIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
//             <Input className="pl-10" id="email" placeholder="Email" required type="email" />
//           </div>
//         </div>
//         <Button className="w-full" onClick={()=>{router.push('/profile')}}>Login</Button>
//       </div>
//     </div>
//   )
// }

// function MailboxIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
//       <polyline points="15,9 18,9 18,11" />
//       <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
//       <line x1="6" x2="7" y1="10" y2="10" />
//     </svg>
//   )
// }


// function PersonStandingIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="5" r="1" />
//       <path d="m9 20 3-6 3 6" />
//       <path d="m6 8 6 2 6-2" />
//       <path d="M12 10v4" />
//     </svg>
//   )
// }


import React, { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyBbC2K7VyH059BoDoqmbaC0xSdwKJ6lOa8",
  authDomain: "chatapp-bde1a.firebaseapp.com",
  databaseURL: "https://chatapp-bde1a-default-rtdb.firebaseio.com",
  projectId: "chatapp-bde1a",
  storageBucket: "chatapp-bde1a.appspot.com",
  messagingSenderId: "665919633249",
  appId: "1:665919633249:web:bc853edb624519b0827720"
};
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to create a user with friends data
const createUserWithFriendsData = async (email, password) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Set friends data for the user
    const friendsData = {
      friendId1: true,
      friendId2: true,
      // Add more friends as needed
    };

    // Set the user's data in the database
    const userRef = ref(database, `users/${userId}`);
    await set(userRef, {
      email: email,
      friends: friendsData
    });

    console.log('User created successfully with friends data!');
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created for user!");
      
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error: ${errorCode} ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
        />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!', credentials);

      // Redirect to profile/page upon successful login
    } catch (error: any) {
      const errorCode = error.code as string;
      const errorMessage = error.message as string;
      console.log(`Error: ${errorCode} ${errorMessage}`);
      setLoginError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <button type="submit"  onClick={()=>{router.push('/profile')}}>Login</button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </form>
  );
}

export default Login;
