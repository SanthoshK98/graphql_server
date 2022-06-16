import { useQuery } from '@apollo/client'
import React from 'react'
import { getBookQuery } from '../queries/queries'

const BookDetail = (props) => {
    
    const {loading, error, data} = useQuery(getBookQuery, {
        variables:{
            id: props.bookId
        }
    })
    console.log(data)
    const displayBookdetails = ()=>{
        
        if(!props.bookId){
            return (
                <div>No book selected....</div>
                )
        }else if(data){
            const {book} = data
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className='other-books'>
                        {
                            book.author.books.map((book)=>(
                                <li key={book.id}>{book.name}</li>
                            ))
                        }
                    </ul>
                </div>
            )
        }else{
            return <div>No Data Found</div>
        }
    }
  return (
    <div id='book-details'>
        {displayBookdetails()}
    </div>
  )
}

export default BookDetail