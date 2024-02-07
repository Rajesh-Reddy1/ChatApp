'use client'
import { Input  } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import Link from "next/link"


import React, { useEffect, useState } from 'react';

// Function to create a user with friends data



import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from "@/lib/data";


function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(()=>{
    if(auth.currentUser?.uid !== null){
      router.push('/profile');
    }
  },[])

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!');
    } catch (error : any) {
      const errorMessage = error.message;
      console.error('Signup error:', errorMessage);
      setSignupError(errorMessage);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');
      router.push('/newchat');
    } catch (error: any) {
      const errorMessage = error.message;
      console.error('Login error:', errorMessage);
      setLoginError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Authentication Page</h1>
      {/* Signup Form */}
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <Button type="submit">Signup</Button>
        {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
      </form>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </form>
    </div>
  );
}

export default AuthPage;