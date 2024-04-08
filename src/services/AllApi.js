import { serverUrl } from "./ServerUrl";
import { commonApi } from "./CommonAPI";

export const uploadBLog=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/blogdata`,reqBody)
}
export const getAllblog=async()=>{
    return await commonApi('GET',`${serverUrl}/blogdata`,"")

}