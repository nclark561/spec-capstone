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
      <header className="bg-gray-800 text-white flex justify-between h-[5vw] items-center">
        <h1 className="m-[4vw] text-2xl">Narrative Nexus</h1>
        <p className="m-[5vw] cursor-pointer anime" onClick={handleClick} >logout</p>
      </header>
    );
  }