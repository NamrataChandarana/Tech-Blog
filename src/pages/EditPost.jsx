import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate,  useParams } from 'react-router-dom';
import service from '../../appwriter/config';
import {Container, PostForm} from "../component/index"

function EditPost() {
    const [post, setPost] = useState("");
    const {slug} = useParams();
    const navigate = useNavigate()
    console.log(slug)

    useEffect(()=>{
        if (slug) {
            service.getSinglePost(slug).then((post) => {
                console.log(post);
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }

    },[slug, navigate])
    console.log({...post})
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post= {post}/>
            </Container>
        </div>
    ) : null;
}

export default EditPost