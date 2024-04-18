import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoginPageController implements Controller<LoginParam>{
    //construcotr
    public constructor(){

    }
    public async execute({email,password,onSuccess,onError}: LoginParam): Promise<void> {
        await apiFetch(
            {
                method : "POST",
                path :"/user?method=login",
                body : {email,password},
                onSuccess : async function (response:Response) {
                    const {success} : RestResponse<undefined> = await response.json();
                    if(success){
                        onSuccess();
                    }else{
                        alert("Email hoặc mật khẩu không đúng !");
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
                
            
            
            }
        )
    }

}

export interface LoginParam{
    email : string,
    password : string,
    onSuccess() : void,
    onError(error: any) : void;
    
}