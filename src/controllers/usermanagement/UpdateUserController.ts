import { userInfo } from "os";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class UpdateUserController implements Controller<UpdateUserControllerParam> {
    //Constructors:
    public constructor(){}

    public async execute({userInfo, onSuccess, onFailed, onError}: UpdateUserControllerParam): Promise<void> {
        //Create form data
        const formData: FormData = new FormData();
        
        formData.set("email",userInfo.email);
        if(userInfo.fullName !== undefined) {
            formData.set("fullName", userInfo.fullName);
        }

        if (userInfo.gender !== undefined) {
            formData.set("gender", userInfo.gender);
        }
        if (userInfo.phoneNumber !== undefined) {
            formData.set("phoneNumber", userInfo.phoneNumber);
        }
        if (userInfo.avatar !== undefined) {
            formData.set("avatar", userInfo.avatar);
        }
        if (userInfo.address !== undefined) {
            formData.set("address", userInfo.address);
        }
        if(userInfo.permission !== undefined) {
            formData.set("permission", userInfo.permission);
        }

        //API fetch
        await apiFetch(
            {   path:"/user?method=update",
                method: "PUT",
                body: formData,
                onSuccess: async function(response: Response){
                    //Get body 
                    const body : RestResponse<undefined> = await response.json();
                    
                    if(body.success) {
                        onSuccess();
                    } else {
                        onFailed(body.code as string, body.message as string);
                    }
                },
                onFailed: async function(error: any) {
                    onError(error);
                },
            }
        )
    }
}

export interface UpdateUserControllerParam {
    userInfo: any;
    onSuccess(): void;
    onFailed(code: string, message: string):void;
    onError(error: any): void;
}