'use client'
import { useAuthContext } from "@/app/context/store"
import { useRouter } from "next/navigation"

export default function page({ params: { id } }: Params) {
    const authCtx = useAuthContext()
    const router = useRouter()

    const handleClick = () => {
        authCtx.logout()
        router.push('/')
    }
  return (
    <>
        <div>userId: {id}</div>
        <button onClick={handleClick}>logout</button>
    </>
  )
}
