import { Client,ID } from "appwrite";
import conf from '../conf/conf.js';
import {  Databases } from "appwrite";
import {  Storage , Query  } from "appwrite";
import { nanoid } from "@reduxjs/toolkit";


class Service{
    client = new Client();
    databases;  
    storage;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);  
        this.databases =  new Databases(this.client);
        console.log(this.databases)
        this.storage = new Storage(this.client);
    }
    async createPost({
        title,slug,content,frontimg,status, userId
    }){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {title,content,frontimg,status,userId})
        }catch(error){
            // console.log("Error creating post: ", error);
            throw error;
            return false;
        }
    }
    async updatePost(slug,{
        title,content,frontimg,status
    }){
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {title,content,frontimg,status})
        }catch(error){
            console.log("Error updating post: ", error);
            return false;
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        }catch(error){
            console.log("deletePost error",error)
            return false
        }
    }
    async getPost(){
        console.log(conf.appwriteDatabaseId)
        try{
           return await this.databases.listDocuments(
                conf.appwriteDatabaseId, conf.appwriteCollectionId
            );
        }catch(error){
            console.log("getPost error",error);
            return false
        }
    }

    async getSinglePost(slug){
        console.log(slug)
        try{
            return  await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        }catch(error){
            console.log("getSinglePost error::",error)
            return false
        }
    }

    async uploadFile(fileId){
        console.log(conf.appwriteBucketId)
        console.log(fileId)
        try{
           return await this.storage.createFile(conf.appwriteBucketId, nanoid(), fileId);
        }catch(error){
            console.log("upaloadFile: error", error)
        }
    }
    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        }catch(error){
            console.log("deleteFile: error", error)
            return false
        }
    }
    async getFilePreview(fileId){
        console.log(fileId)
        try{
          return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
        }catch(error){
            console.log("filepreview error",error)
        }
    }

}

const service =  new Service();
export default service;