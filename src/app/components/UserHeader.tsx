'use client'
import Link from "next/link";
import { useAuthContext } from "@/app/context/store"
import { useRouter } from "next/navigation"

export default function UserHeader() {
    const authCtx = useAuthContext()
    const router = useRouter()

    const handleClick = () => {
        authCtx.logout()
        router.push('/')
    }
    return (
      <header className="bg-gray-800 text-white flex justify-end">
        <h1>Narrative Nexus</h1>
        <p onClick={handleClick} className="cursor-pointer">logout</p>
      </header>
    );
  }