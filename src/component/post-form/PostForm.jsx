import React from 'react'
import { useForm } from "react-hook-form";
import service from '../../../appwriter/config';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Input, Button, RTE, Select} from '../index'
import { useCallback, useEffect} from 'react';
function PostForm({post}) {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
    },
});
  const userData = useSelector(state => state.userData);
  const navigate = useNavigate();

  const submit = async (data) => {
    if(post) {

        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
    
        if(file){
            await service.deleteFile(post.frontimg);
        }
        const dbPost = await service.updatePost(post.$id, {
            ...data,
            frontimg: file ? file.$id : undefined,
        });
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    }else{
        console.log(data.image[0])
        const file = await service.uploadFile(data.image[0]);
        console.log(file.$id)

        if(file){
            const fileId = file.$id;
            data.frontimg = fileId;
            await service.createPost({...data,userId: userData.$id})
        }
    }

  }
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
    }, []);

    useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
         <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
             <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
         </div>
         <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif, image/jfif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm