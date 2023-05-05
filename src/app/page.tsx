import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  axios
    .post("./api/sync/route.ts")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
