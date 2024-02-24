'use client'
import { useState ,useContext} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { EyeIcon, FlagIcon } from "@/components/leftmenu";

type ToggleFormFunction = () => void;



import { signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "@/lib/data";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const [signupError, setSignupError] = useState(null);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Handle successful login, such as redirecting to another page
            console.log('User logged in successfully!');
            router.push('/getmsg');
        } catch (error: any) {
            setError(error.message);
        }
    };
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully!');
        } catch (error: any) {
            const errorMessage = error.message;
            console.error('Signup error:', errorMessage);
            setSignupError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
                <div className="mx-auto flex items-center rounded-lg bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-3">
                    <FlagIcon className="h-6 w-6 text-primary-500" />
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <EyeIcon className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                    <Button className="w-full" onClick={handleLogin}>
                        Login
                    </Button>
                    {error && <p className="text-red-500">{error}</p>}
                    <Link href="#" className="block text-center text-sm underline">
                        Forgot Password?
                    </Link>
                </div>
                <div className="space-y-2 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Don't have an account?</p>

                    <Button className="w-full">  Sign Up</Button>
                </div>
            </div>
        </div>
    );
}
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


import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';





export default function Account() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    const db = getFirestore(app);

    const handleSignup = async () => {
        console.log('User added to Firestore successfully!');

        try {
            const usersCollection = doc(db, 'users', username);
            await setDoc(usersCollection, {
                email,
                username,
                password,
            });
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
        }
    };

    // Function to create a new user account
    const handleLogin = async () => {
        try {
            const usersCollection = doc(db, 'users', username);
            const userSnapshot = await getDoc(usersCollection);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();


                if ( userData.password === password) {
                    console.log('User logged in successfully!');
                    alert("You're now logged in!");
                } else {
                    alert( "Wrong Password" );
                }
            } else {
                alert('User does not exist');
            }
        } catch (error) {
            alert('Error logging in user:');
        }
    };
    

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
}