import LoginForm from "./LoginForm"
import Header from "../components/Header"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Login or register to begin your journey as an author."
};

export default function LoginPage() {
  return (
    <main>
      <Header page='login'/>
      <div className='h-[74.2vh] img flex flex-col justify-center items-center' >
        <LoginForm/>
      </div>
    </main>
  )
}
