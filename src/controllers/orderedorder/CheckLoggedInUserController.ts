import User from "../../entities/order/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CheckLoggedInUserController implements Controller<CheckLoggedInUserParam>{
    public async execute({onFailed,onError}: CheckLoggedInUserParam): Promise<void> {
        await apiFetch({
            method: "GET",
            path: "/user?method=getLoggedIn",
            onSuccess: async function (response: Response) {
                const { success, code, message}: RestResponse<User> = await response.json();
                
                if(!success) {
                    onFailed(code as string, message as string);
                }
               
            },
            onFailed: async function (error: any) {
                onError(error);
            }
        }); 
    }

}

export interface CheckLoggedInUserParam {
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}