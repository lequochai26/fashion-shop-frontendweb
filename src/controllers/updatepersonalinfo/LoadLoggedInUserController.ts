import User from "../../entities/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadLoggedInUserController implements Controller<LoadLoggedInUserControllerParam> {
    // Static fields:
    private static getLoggedInUserPath: string = "/user?method=getLoggedIn";

    // Methods:
    public async execute({ onSuccess, onError, onFailed }: LoadLoggedInUserControllerParam): Promise<void> {
        apiFetch(
            {
                method: 'GET',
                path: LoadLoggedInUserController.getLoggedInUserPath,
                onSuccess: async function(response: Response) {
                    const body: RestResponse<User> = await response.json();

                    if (body.success) {
                        onSuccess(body.result as User);
                    }  else {
                        onFailed(body.code as string,body.message as string)
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
            }
        );
    }
}

export interface LoadLoggedInUserControllerParam {
    onSuccess: (user: User) => void
    onFailed(code: string, message: string): void;
    onError: (error: any) => void
}