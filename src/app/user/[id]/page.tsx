import UserHeader from "@/app/components/UserHeader"
import BookList from "./BookList"
import BookForm from "./BookForm"

export default function page({ params: { id } }: Params) {

  return (
    
    <main>
        <UserHeader />
        <div className="flex">
          <section className="flex flex-col">
            <BookList/>
          </section>
          <section>
            <BookForm/> 
          </section>
        </div>
    </main>
  )
}
