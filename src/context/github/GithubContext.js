import { createContext,useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext=createContext()
const GITHUB_URL=process.env.REACT_APP_GITHUB_URL

export const GithubProvider=({children})=>{

    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state,dispatch]=useReducer(githubReducer,initialState) 

    // for testing  purposes
    const fetchUsers=async ()=>{
        setLoading()
        const response=await fetch(`${GITHUB_URL}/users`)
        const data=await response.json()
        dispatch({//dispatch to update our state 
                // it going to call githubReducer with some params
            type:'GET_USERS',
            payload:data, //payload is all the info that we need to performe this change
        })
    }

    //Get Search Result
    const searchUsers=async(text)=>{
         setLoading()
         const params=new URLSearchParams({
            q:text
         })
         const response=await fetch(`${GITHUB_URL}/search/users?${params}`) 
         const {items}=await response.json() //we wanna item from that data (data is an object who has item as prop)
         dispatch({//dispatch to update our state 
                     // it going to call githubReducer with some params
            type:'GET_USERS',
            payload:items ///payload is all the info that we need to performe this change
         })

    }

    // Get user and repos
 const getRepos = async (login) => { 
     setLoading()
        const params  =new URLSearchParams({
            sort:'created',
            per_page:10
        })
        const response= await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)
        
        if(response.status===404){
            window.location='/notFound'
        }
        else{
            const data =await response.json()
            dispatch({
                type:'GET_REPOS',
                payload:data,
                loading:false
            })
        }
    }

  
    //get a single user
    const getUser= async (login)=>{
        setLoading()

        const response= await fetch(`${GITHUB_URL}/users/${login}`)
        
        if(response.status===404){
            window.location='/notFound'
        }
        else{
            const data =await response.json()
            dispatch({
                type:'GET_USER',
                payload:data,
                loading:false
            })
        }
    }


    //Clear Users from state
    const clearUsers=()=>{
        dispatch({
            type:'CLEAR_USERS'
        })
    }

//set Loading
const setLoading=()=>dispatch({type:'SET_LOADING'})

    return <GithubContext.Provider value={{
        users:state.users,
        loading:state.loading,
        user:state.user,
        repos:state.repos,
        fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext