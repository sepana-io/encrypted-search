import moment from "moment";
//@ts-ignore:
import CryptoJS from "crypto-js";
import EthCrypto from "eth-crypto";
export const getTime = (date = new Date()) => moment(date).format("MMM DD, YYYY HH:mm")


var key: any = ""; //length=22
var iv: any = ""; //length=22
key = CryptoJS.enc.Base64.parse(key);
iv = CryptoJS.enc.Base64.parse(iv);


export const generateEncryptedMessage = (message: string, key?:any) => {
    const newKey = key? key : window.localStorage.getItem("sign")
    let x = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(newKey)).substring(0, 32)
    x = CryptoJS.enc.Hex.parse(x)
    let encryptedMessages = []
    if (message) {
        const words = message.split(" ")
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            //@ts-ignore:
            let code = CryptoJS.AES.encrypt(word, x, { iv: iv })
            // newKey && ethEncrypt(word, newKey)
            encryptedMessages.push(code)
        }
        return encryptedMessages.join(" ")
    }
    return null
}



export const decryptMessage = (encryptedTexts: string) => {
    const newKey = window.localStorage.getItem("sign")

    let x = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(newKey)).substring(0, 32)
    x = CryptoJS.enc.Hex.parse(x)

    const encryptedText = encryptedTexts.split(" ")
    const dectryptedText = []
    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedWord = encryptedText[i]
        //@ts-ignore:
        var bytes = CryptoJS.AES.decrypt(encryptedWord, x, { iv: iv });
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        dectryptedText.push(originalText)
    }
    return dectryptedText.join(" ")
}


export const generateKey = (p: string) => {
    let hash = CryptoJS.SHA3(p, { outputLength: 128 });
    hash = hash.toString();
    window.localStorage.setItem("se-enc", hash);
    return hash
}

const ethEncrypt =async(message:string,newKey:string)=>{
    const entropy = Buffer.from(newKey, 'utf-8')
    const identity = EthCrypto.createIdentity(entropy);
    const encrypted = await EthCrypto.encryptWithPublicKey(identity.publicKey, message)
    console.log("encrypted",encrypted)
    return encrypted
}

const ethDecrypt =async(encrypted:any, privateKey:string)=>{
    // const identity = EthCrypto.createIdentity();
    const decrypted = await EthCrypto.decryptWithPrivateKey(privateKey, encrypted)
    return decrypted
}