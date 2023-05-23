import UserHeader from "@/app/components/UserHeader"
import BookList from "./BookList"

export default function page({ params: { id } }: Params) {

  return (
    
    <main>
        <UserHeader />
        <div className="flex">
          <section className="flex flex-col">
            <BookList/>
          </section>
          <section></section>
        </div>
    </main>
  )
}
