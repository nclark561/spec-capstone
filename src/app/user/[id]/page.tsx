import UserHeader from "@/app/components/UserHeader"
import BookList from "./BookList"
import BookForm from "./BookForm"

export default function page({ params: { id } }: Params) {

  return (
    
    <main>
        <UserHeader />
        <div className="flex">
          <section className="flex flex-col gap-3">
            <BookList/>
          </section>
          <section className='min-h-[74.2vh] w-full img flex flex-col justify-center items-center'>
            <BookForm/> 
          </section>
        </div>
    </main>
  )
}
