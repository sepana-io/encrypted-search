import { useEffect, useState } from "react"
import axios from "axios";
//@ts-ignore:
import CryptoJS from "crypto-js";

export const useAPI =()=>{

    const sendKeys = async(publicKey:string)=>{
        // console.log("publicKey",publicKey)
        try{
            const newKey = window.localStorage.getItem("sign")
            let x = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(newKey)).substring(0, 32)
            x = CryptoJS.enc.Hex.parse(x)
            const data = {
                aes_key: JSON.stringify(x),
                public_key: publicKey
            }
            console.log("publicKey data",data)
           const res = await axios.post("/api/v1/persist_exchange",data)
           return res
        }
        catch(e){
            console.log("error 2",e)
        }
    }

    const getKeys = async(publicKey:string)=>{
        try{
            const data = {
                public_key:publicKey
            }
           const res = await axios.post("/api/v1/get_exchange",data)
           return res
        }
        catch(e){
            console.log("error",e)
        }
    }

    return {sendKeys,getKeys}

}

