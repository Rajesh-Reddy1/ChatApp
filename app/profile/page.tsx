/**
 * v0 by Vercel.
 * @see https://v0.dev/t/I0TQ08myFX2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function ProfileOptions() {
    return (
        <div className="flex flex-col gap-4">
            <Link className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800" href="#">
                <div className="font-semibold">Change Name</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Update your display name</div>
            </Link>
            <Link className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800" href="#">
                <div className="font-semibold">Change Picture</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Update your profile picture</div>
            </Link>
            <Link className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800" href="#">
                <div className="font-semibold">Change Bio</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Update your bio information</div>
            </Link>
            <Link className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800" href="#">
                <div className="font-semibold">Sign Out</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Sign out from your account</div>
            </Link>
        </div>
    )
}

