
'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDatabase, ref, set } from "firebase/database"
import { app, msg } from "@/lib/data"
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