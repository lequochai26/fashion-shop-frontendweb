import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class UpdatePersonalInfoController implements Controller<UpdatePersonalInfoControllerParam>{
    //Constructor:
    public constructor() {}

    public async execute({ user,onSuccess, onError,onFailed }: UpdatePersonalInfoControllerParam): Promise<void> {
        //Create form data
        const formData: FormData = new FormData();

        if(user.fullName !== undefined) {
            formData.set("fullName", user.fullName);
        }

        if (user.gender !== undefined) {
            formData.set("gender", user.gender);
        }
        if (user.phoneNumber !== undefined) {
            formData.set("phoneNumber", user.phoneNumber);
        }
        if (user.avatar !== undefined) {
            formData.set("avatar", user.avatar);
        }
        if (user.address !== undefined) {
            formData.set("address", user.address);
        }

        //API fetch
        await apiFetch(
            {   path:"/user?method=updatePersonalInfo",
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

export interface UpdatePersonalInfoControllerParam {
    user: any;
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error:any) : void;
}