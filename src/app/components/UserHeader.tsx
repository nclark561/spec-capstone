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
      <header className="bg-gray-800 text-white flex justify-between h-[10vw] items-center">
        <h1 className="m-[4vw]">Narrative Nexus</h1>
        <p className="m-[5vw] cursor-pointer" onClick={handleClick} >logout</p>
      </header>
    );
  }