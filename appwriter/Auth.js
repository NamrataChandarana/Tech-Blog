import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js'
import { nanoid } from "@reduxjs/toolkit";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        console.log(conf.appwriteProjectId)
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);  
        console.log(this.client);
        this.account = new Account(this.client);
        console.log(this.account)
    }

    async createAccount({email,password, name}) {
        try{
            const userAccount = await this.account.create(nanoid(), email, password, name);
            console.log(userAccount)

            if(userAccount){
                //direct login
               return this.login({email, password});
            }else{
                return userAccount;
            }
        }catch(error){
            // console.log("CreateAccount:: error", error);
            throw error;
        }
        
    }

    async login({email,password}){
        try{
           return await this.account.createEmailSession(email,password);
        //    console.log(result)
           
        }catch(error){
            // console.log("Login:: error", error);
            throw error;
        }
        
    }
    async logout(){
        try{
           await this.account.deleteSessions();
        }catch(error){
            console.log("delete:: error", error);
        }
    }
    async getAccount(){
        try{
            const currentUser =  await this.account.get();
            console.log(currentUser);
            return currentUser
        }catch(error){
            console.log("GetAccount:: error", error);
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;