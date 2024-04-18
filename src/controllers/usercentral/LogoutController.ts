import User from "../../entities/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";


export default class LogoutController implements Controller<LogoutParam> {
    
    //Constructor
    public constructor() {

    }

    //Init


    //Methods:
    public async execute({ onSuccess, onError }: LogoutParam): Promise<void> {
        apiFetch(
            {
            method: "POST",
            path: "/user?method=logout",
            onSuccess: async function (response: Response) {
                const {success, code, message}: RestResponse<User> = await response.json();

                if (success) {
                    onSuccess();
                }
                else {
                    alert(`Code: ${code}, Message: ${message}`);
                }
            },
            onFailed: async function (error) {
                onError(error);
            },
        })

    }

}

export interface LogoutParam {
    onSuccess(): void;
    onError(error: any): void;
}