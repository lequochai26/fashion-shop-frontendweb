import User from "../entities/User";
import RestResponse from "../interfaces/RestResponse";
import { apiFetch } from "../utils/APIFetcher";
import Controller from "./Controller";

export default class LoadLoggedInUserController implements Controller<LoadLoggedInUserParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onFailed, onSuccess }: LoadLoggedInUserParam): Promise<void> {
        await apiFetch({
            method: "GET",
            path: "/user?method=getLoggedIn",
            onSuccess: async function (response: Response) {
                const { success, code, message, result }: RestResponse<User> = await response.json();

                if (success) {
                    onSuccess(result as User);
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            }
        });
    }
}

export interface LoadLoggedInUserParam {
    onSuccess(user: User): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}