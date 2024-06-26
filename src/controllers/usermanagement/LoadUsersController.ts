import User from "../../entities/User";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadUsersController implements Controller<LoadUsersControllerParam> {
    // Constructors
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onFailed, onError }: LoadUsersControllerParam): Promise<void> {
        await apiFetch(
            {
                method: "GET",
                path: "/user?method=getAll",
                onSuccess: async function (response: Response) {
                    const body: RestResponse<User[]> = await response.json();

                    if (body.success) {
                        onSuccess(body.result as User[]);
                    }
                    else {
                        onFailed(body.code as string, body.message as string);
                    }
                },
                onFailed: async function (error) {
                    onError(error);
                },
            }
        );
    }
}

export interface LoadUsersControllerParam {
    onSuccess(users: User[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}