import User from "../../entities/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";


export default class LogoutController implements Controller<LogoutParam> {

    //Constructor
    public constructor() {

    }

    //Methods:
    public async execute({ user, onSuccess, onError }: LogoutParam): Promise<void> {
        apiFetch(
            {
            method: "POST",
            path: "/user?method=logout",
            body: {
                email: user.email
            },
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
    user: User;
    onSuccess(): void;
    onError(error: any): void;
}