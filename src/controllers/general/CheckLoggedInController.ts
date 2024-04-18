import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CheckLoggedInController implements Controller<CheckLoggedInparam>{
    public async execute({onSuccess,onError}: CheckLoggedInparam): Promise<void> {
        await apiFetch({
            method:"GET",
            path:"/user?method=getLoggedIn",
            onSuccess: async function (response:Response) {
                const {success} : RestResponse<undefined> = await response.json();
                if(success){
                    onSuccess(success);
                }
            },
            onFailed : async function (error:any) {
                onError(error);
            }
        })
    }

}


export interface CheckLoggedInparam{
    onSuccess(loggedIn: boolean) : void;
    onError(error:any) : void;
    

}