
'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDatabase, ref, set } from "firebase/database"
import { app, msg } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
export default function Component() {
    let [sender,SetSender] = useState<string>("");
    let [receiver,SetReceiver] = useState<string>("");
    let [content,SetContent] = useState<string>("");
    const uuid =uuidv4();

    return (


        <div className="mt-auto flex items-center gap-4 w-full">
            <Input
                className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
                placeholder="Type sender..."
                type="text"
                onChange={(e)=>{SetSender(e.currentTarget.value)}}
            />
            <Input
                className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
                placeholder="Type receiver..."
                type="text"
                onChange={(e)=>{SetReceiver(e.currentTarget.value)}}
            />
            <Input
                className="w-full bg-white shadow-none appearance-none pl-2 dark:bg-gray-950"
                placeholder="Type a message..."
                type="text"
                onChange={(e)=>{SetContent(e.currentTarget.value)}}
            />
            <Button 
            onClick={()=>{
                const db = getDatabase(app);
                let msg_id = uuid;
                const senderMsgRef = ref(db, `users/${sender}/msgs/${msg_id}`);
                const msg: msg = {sender: sender,receiver:receiver, content: content,timestamp: Date.now()};
                set(senderMsgRef,msg);
            }}
            >Send</Button>
        </div>


    )
}

function PlusIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}


function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function SettingsIcon() {
    return (
        <svg

            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function UserIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

