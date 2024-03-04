'use client'
import React, { useState, useEffect } from 'react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';
import { app } from "@/lib/data";
import {useRouter} from 'next/router';


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useApp } from '@/components/Messageprovider';
import { redirect } from 'next/navigation';

export default function Account() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {currentUser, setcurrentUser} = useApp();
    const router = useRouter();


    const db = getFirestore(app);

    const validateEmail = (email: any) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleSignup = async () => {
        if (password.length < 8) {
            alert('Password should be at least 8 characters');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }

        try {
            const usersCollection = doc(db, 'users', username);
            const userSnapshot = await getDoc(usersCollection);

            if (userSnapshot.exists()) {
                alert('Username already exists');
                return;
            }

            await setDoc(usersCollection, {
                email,
                username,
                password,
            });

            console.log('User added to Firestore successfully!');
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const usersCollection = doc(db, 'users', username);
            const userSnapshot = await getDoc(usersCollection);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                if (userData.password === password) {
                    console.log('User logged in successfully!');
                    alert("You're now logged in!");
                    setcurrentUser(username);
                    redirect('/getmsg')
                } else {
                    alert("Wrong Password");
                }
            } else {
                alert('User does not exist');
            }
        } catch (error) {
            alert('Error logging in user:'+error);
        }
    };
    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">

                <Tabs defaultValue="login" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Login to  your existing account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Username</Label>
                                    <Input onChange={(e) => { setUsername(e.currentTarget.value) }} id="email" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input onChange={(e) => { setPassword(e.currentTarget.value) }} id="Current" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => {
                                    console.log(username, password);
                                    handleLogin();
                                }}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>SignUp</CardTitle>
                                <CardDescription>
                                    Create a new account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <div className="space-y-0">
                                    <Label htmlFor="email">Email</Label>
                                    <Input onChange={(e) => { setEmail(e.currentTarget.value) }} id="mail" type="email" />
                                </div>
                                <div className="space-y-0">
                                    <Label htmlFor="name">Username</Label>
                                    <Input onChange={(e) => { setUsername(e.currentTarget.value) }} id="Username" />
                                </div>
                                <div className="space-y-0">
                                    <Label htmlFor="new">New password</Label>
                                    <Input onChange={(e) => { setPassword(e.currentTarget.value) }} id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => { handleSignup(); console.log(username, email, password) }}>SignUP</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )

};


