'use client'
import { createContext, useContext, useState } from "react"

const BookContext = createContext({
    bookList: [],
    //@ts-ignore
    setBookList: () => {},
    currBook: {},
    //@ts-ignore
    setCurrBook: () => {}
})

//@ts-ignore
export const BookContextProvider = ({ children }) => {
    const [bookList, setBookList] = useState([])
    const [currBook, setCurrBook] = useState('')

    const contextValue = {
        bookList,
        setBookList,
        currBook,
        setCurrBook,
    }

    return (
        //@ts-ignore
        <BookContext.Provider value={contextValue}>
          {children}
        </BookContext.Provider>
      )
}

export const useBookContext = () => useContext(BookContext)