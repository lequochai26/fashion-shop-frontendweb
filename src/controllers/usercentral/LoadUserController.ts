import User from "../../entities/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadUserController implements Controller<LoadUserParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onError }: LoadUserParam): Promise<void> {
        await apiFetch({
            method: "GET",
            path: "/user?method=getLoggedIn",
            onSuccess: async function (response: Response) {
                const { success, result }: RestResponse<User> = await response.json();

                if (success) {
                    onSuccess(result as User);
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            },
        });
    }
}

export interface LoadUserParam {
    onSuccess(user: User): void;
    onError(error: any): void;
}