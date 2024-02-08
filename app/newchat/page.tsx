
'use client'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { getDatabase, ref, set } from "firebase/database"
// import { app, msg } from "@/lib/data"
// import { useState } from "react"
// import { v4 as uuidv4 } from 'uuid';
// export default function Component() {
//     let [sender,SetSender] = useState<string>("");
//     let [receiver,SetReceiver] = useState<string>("");
//     let [content,SetContent] = useState<string>("");
//     const uuid =uuidv4();

//     return (


//         <div className="mt-auto flex items-center gap-4 w-full">
//             <Input
//                 className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
//                 placeholder="Type sender..."
//                 type="text"
//                 onChange={(e)=>{SetSender(e.currentTarget.value)}}
//             />
//             <Input
//                 className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
//                 placeholder="Type receiver..."
//                 type="text"
//                 onChange={(e)=>{SetReceiver(e.currentTarget.value)}}
//             />
//             <Input
//                 className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
//                 placeholder="Type a message..."
//                 type="text"
//                 onChange={(e)=>{SetContent(e.currentTarget.value)}}
//             />
//             <Button 
//             onClick={()=>{
//                 const db = getDatabase(app);
//                 let msg_id = uuid;
//                 const senderMsgRef = ref(db, `users/${sender}/msgs/${msg_id}`);
//                 const msg: msg = {sender: sender,receiver:receiver, content: content,timestamp: Date.now()};
//                 set(senderMsgRef,msg);
//             }}
//             >Send</Button>
//         </div>


//     )
// }
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { EyeIcon, FlagIcon } from "@/components/leftmenu";

type ToggleFormFunction = () => void;

interface LoginFormProps {
    toggleForm: ToggleFormFunction;
}

interface SignUpFormProps {
    toggleForm: ToggleFormFunction;
}


import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth} from "firebase/auth";
import { app } from "@/lib/data";
import router from "next/router";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Handle successful login, such as redirecting to another page
            console.log('User logged in successfully!');
        router.push('');
        } catch (error:any) {
            setError(error.message);
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
                    <Link href="#" className="btn btn-outline btn-sm w-full">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}