import React from 'react'
import service from '../../appwriter/config'
// import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container , PostCard } from '../component/index'
function AllPost() {
    const [posts, setPosts] = useState([]);
    // const dispatch = useDispatch();

    useEffect(() => {
        service.getPost([]).then((post) => {
            // console.log(post)
            if (post) {
                setPosts(post.documents)
            }
        })
    
    }, [])

   
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPost