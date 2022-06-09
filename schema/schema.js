const graphql = require('graphql')
const _ = require('lodash')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

const books = [
    {name:"ramayana",genre:"mythology",id:'1',authorId: '1'},
    {name:"mahabharat",genre:"epic",id:'2', authorId: '2'},
    {name:"samaveda",genre:"epic",id:'2', authorId: '2'},
    {name:"rigveda",genre:"epic",id:'2', authorId: '1'},
]

const authors = [
    {name:'valmiki',age:55,id:'1'},
    {name:'vedavyas',age:65,id:'2'}
]

const BookType = new GraphQLObjectType({
    name:"Book",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){
                // console.log(parent)
                return _.find(authors,{id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        id: {type:GraphQLID},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from database
               return _.find(books,{id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})