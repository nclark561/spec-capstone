import UserHeader from "@/app/components/UserHeader"
import BookList from "./BookList"
import BookForm from "./BookForm"

export default function page({ params: { id } }: Params) {

  return (
    
    <main>
        <UserHeader />
        <div className="flex">
          <section className="flex flex-col gap-3 border-gray-500 border-b">
            <BookList/>
          </section>
          <section className='min-h-[74.2vh] w-full img flex flex-col justify-center items-center'>
            <BookForm/> 
          </section>
        </div>
        <footer className="bg-gray-800 h-[5vw]"></footer>
    </main>
  )
}
