import React,{useEffect,useState} from 'react'
import {PostForm} from'../components'
import  appwriteService from "../appwrite/config";
import { useNavigate,useParams } from 'react-router-dom';

function Editpost() {
    const[post,setPosts]=useState(null)
    const{slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
                else{
                    navigate('/')
                }
            })
        }
    },[slug,navigate])
    return post ? (
        <div>
            <PostForm post={post} />
            
        </div>
      ) : null
}

export default Editpost