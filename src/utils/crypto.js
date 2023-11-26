import { variables } from "../Conf";
import CryptoJS from "crypto-js";


const { SECRET } = variables.CRYPTO;


const criptografar = (senha) => {
    const textoCriptografado = CryptoJS.AES.encrypt(senha, SECRET).toString();
    return textoCriptografado;
};


const descriptografar = (senha) => {
	const textoEmBytes = CryptoJS.AES.decrypt(senha, SECRET);
    const textoDescripytografado = textoEmBytes.toString(CryptoJS.enc.Utf8);
	return textoDescripytografado;
};


export { criptografar, descriptografar };