'use client'
import { createContext, useContext, useState } from "react"

const BookContext = createContext({
    bookList: [],
    //@ts-ignore
    setBookList: () => {}
})

//@ts-ignore
export const BookContextProvider = ({ children }) => {
    const [bookList, setBookList] = useState()

    const contextValue = {
        bookList,
        setBookList
    }

    return (
        //@ts-ignore
        <BookContext.Provider value={contextValue}>
          {children}
        </BookContext.Provider>
      )
}

export const useBookContext = () => useContext(BookContext)