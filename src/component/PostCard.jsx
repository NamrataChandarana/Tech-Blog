import React from 'react'
import service from "../../appwriter/config"
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'

function PostCard({$id, title, frontimg}) {

  const [imgUrl , setImgUrl] = useState("")

  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await service.getFilePreview(frontimg);
        setImgUrl(res.href);
      } catch (error) {
        console.error('Error fetching file preview:', error);
      }
    }
    fetchData()
    },[])
    // console.log(imgUrl)
  return (
    <Link  to={`/post/${$id}`}> 
      <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              
                <img src={imgUrl} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
      </Link>
  )
}

export default PostCard