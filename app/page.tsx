/**
 * v0 by Vercel.
 * @see https://v0.dev/t/egZxQ8evD0y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useHistory } from 'react-router-dom';


export default function Component() {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/app/newchat/page');
  };
  return (
    
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center dark:text-gray-100">Login</h2>
        <div className="space-y-4">
          <div className="relative">
            <PersonStandingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Input className="pl-10" id="username" placeholder="Username" required type="text" />
          </div>
          <div className="relative">
            <MailboxIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Input className="pl-10" id="email" placeholder="Email" required type="email" />
          </div>
        </div>
        <Button className="w-full" onClick={handleButtonClick} >Login</Button>
      </div>
    </div>
  )
}

function MailboxIcon(props) {
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
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      <polyline points="15,9 18,9 18,11" />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  )
}


function PersonStandingIcon(props) {
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
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  )
}
