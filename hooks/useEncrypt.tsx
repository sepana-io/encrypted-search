import { decryptMessage, generateEncryptedMessage } from "@utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"

const useEncrytp = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    // useEffect(()=>{
    //     checkLogin()
    // },[])


    const send = async (type: string, data: any) => {
        return new Promise(function (resolve, reject) {
            //@ts-ignore:
            chrome.runtime.sendMessage(
                "bgeghaoffdelkkcpgojdhokkanbmfjlg",
                { "type": type, "data": data },
                (response: any) => {
                    //@ts-ignore:
                    return response ? resolve(response) : reject(chrome.runtime.lastError)
                })
        })
    }

    const checkLogin = async () => {
        const x = await send("get_key", "");
        setIsLoggedIn(x === true ? x : false);
    }

    const login = async (key = "sdslkjfsldfjaldfj", iv = "sdslkjfsldfjaldfj") => {
        const res: any = await send("login", key)
    }

    const sendPost = async (message: string, address: string, type: string) => {
        try {

            const encrypted = generateEncryptedMessage(message)
            const data = {
                text: encrypted,
                shared: false,
                creator_address: address,
                shared_addresses: [],
                document_type: type
            }
            const res = await axios.post("/api/v1/index", data)
            return res.data
        }
        catch (e) {
            console.log("error", e)
        }

    }

    const getPosts = async (message: string,keys:any[]) => {
        try {
            //To-Do check this function
            const newKey = window.localStorage.getItem("sign")
            keys.filter(k => k !== newKey);
            const encrypted = generateEncryptedMessage(message)
            const data = {
                text: encrypted
            }
            const res = await axios.post("/api/v1/search", data)
            const d1 = decryptData(res.data.data)
            
            const encrypted2 = generateEncryptedMessage(message,keys[0])
            const data2 = {
                text: encrypted2
            }
            const res2 = await axios.post("/api/v1/search", data2)
            const d2 = decryptData(res2.data.data)
            return [...d1, ...d2]
        }
        catch (e) {
            console.log("error", e)
        }
    }


    const decryptData = (data: any[]) => {
        let x: any[] = []
        for (let i = 0; i < data.length; i++) {
            let post = data[i];
            post._source.dtext = decryptMessage(post._source.text)
            x.push(post)
        }
        return x
    }

    return { getPosts, sendPost, login }
}

export default useEncrytp