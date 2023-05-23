import { Inter } from 'next/font/google'
import axios from 'axios';
import type { Metadata } from 'next';
import Header from './components/Header';

export const metadata: Metadata = {
  title: "Home",
  description: "Next app designed and optimized for brainstorming and mapping out plans for your books."
};

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className='flex flex-col'>
      <Header page='home'/>
      <h1>home page</h1>
    </main>
  )
}
