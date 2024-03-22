import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwriter/config";
import { Button, Container } from "../component/index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [imgUrl , setImgUrl] = useState("")
    const userData = useSelector((state) => state.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const dispatch = useDispatch();

    const authenticate = useSelector((state) => state.userData)

    useEffect(() => {
        if (slug) {
            service.getSinglePost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    const res = service.getFilePreview(post.frontimg).then((res) =>{
                        // console.log(res.href)
                        setImgUrl(res.href);
                        // console.log(imgUrl)
                    });
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.frontimg);
                navigate("/");
            }
        });
    };
    
    // console.log(imgUrl)

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 " >
                    <img
                        src={imgUrl}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {/* {console.log(post.$id)} */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                </div>
                <div className="browser-css text-white">
                    {parse(String(post.content))}
                    </div>
            </Container>
        </div>
    ) : null;
}