import { Inter } from 'next/font/google'
import type { Metadata } from 'next';
import Header from './components/Header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Home",
  description: "Next app designed and optimized for brainstorming and mapping out plans for your books."
};

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className='flex flex-col'>
      <Header page='home'/>
      <div className='h-[74.2vh] img flex flex-col justify-center items-center' >
        <h1 className='text-white text-6xl '>Narrative Nexus</h1>
        <h3 className='text-white text-4xl font-extralight m-3'>Make your stories come to life</h3>
        <button className='bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md' ><Link href="/login">Start Now</Link></button>
      </div>
      <footer className="bg-gray-800 text-white flex justify-between h-[10vw] items-center"></footer>
    </main>
  )
}
