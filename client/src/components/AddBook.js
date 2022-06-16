import React, { FormEventHandler, useState } from 'react'
import {useQuery, useMutation} from '@apollo/client'
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries'


const AddBook = () => {
    const {loading, error, data} = useQuery(getAuthorsQuery)
    const [addBook] = useMutation(addBookMutation)
    const [bookData, setBookData] = useState({
        name:'',
        genre:'',
        authorId:''
    })
    const displayAuthors = ()=>{
        if(loading){
            return <option disabled>Loading Authors....</option>
        }else if(error){
            return <option disabled>No Authors Found</option>
            
        }else{
            return data.authors.map(author=>(
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        }
    }

    const submithandler = (e)=>{
        e.preventDefault()
        addBook({
            variables: {
                name: bookData.name,
                genre: bookData.genre,
                authorId: bookData.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        })
        setBookData({
            name:'',
            genre:'',
            authorId:''
        })
    }
  return (
    <div>
        <form id='add-book' onSubmit={submithandler}>
            <div className='field'>
                <label>Book name:</label>
                <input type='text' onChange={(e)=>setBookData({...bookData,name:e.target.value})}/>
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text'onChange={(e)=>setBookData({...bookData,genre:e.target.value})}/>
            </div>
            <div className='field'>
                <label>Author:</label>
                <select onChange={(e)=>setBookData({...bookData,authorId:e.target.value})}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    </div>
  )
}

export default AddBook