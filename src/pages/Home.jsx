import React from 'react'
// import {useDispatch} from 'react-redux'
import service from '../../appwriter/config';
import {Container, PostCard} from '../component/index'
import { useState } from 'react';
import { useEffect } from 'react';
function Home() {
    // const dispatch = useDispatch();
    const [posts, setPosts] = useState([])
    const [loading, setLoding] = useState(true)

    useEffect(() => {
        service.getPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoding(false)
            }
        })
    }, []) 

    if (posts.length === 0 && loading === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts yet!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        loading ? (
            <div className='text-center text-xl font-bold m-28'>Loading...</div>
          )
          : (
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
    )

  
}

export default Home