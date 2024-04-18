import User from "../../entities/order/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";
import { LoadLoggedInUserParam } from "../LoadLoggedInUserController";

export default class CheckLoggedInUserController implements Controller<CheckLoggedInUserParam>{
    public async execute({onSuccess,onError}: CheckLoggedInUserParam): Promise<void> {
        await apiFetch({
            method: "GET",
            path: "/user?method=getLoggedIn",
            onSuccess: async function (response: Response) {
                const { success, code, message, result }: RestResponse<User> = await response.json();
                
               
            },
            onFailed: async function (error: any) {
                onError(error);
            }
        }); 
    }

}

export interface CheckLoggedInUserParam {
   
    onSuccess(loggedIn: boolean): void;
    onError(error: any): void;
}