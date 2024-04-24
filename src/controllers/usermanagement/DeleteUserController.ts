import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class DeleteUserController implements Controller<DeleteUserControllerParam> {
    public constructor() {

    }

    public async execute({email, onSuccess, onFailed, onError}: DeleteUserControllerParam): Promise<void> {
        await apiFetch(
            {
                path: `/user?method=remove&email=${email}`,
                method: "DELETE",
                onSuccess: async function (response) {
                    const {code, message, success} = await response.json();

                    if(success) {
                        onSuccess();
                    } else {
                        onFailed(code, message);
                    }
                },
                onFailed: async function(error) {
                    onError(error);
                },
            }
        )
    }
}

export interface DeleteUserControllerParam {
    email: string;
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}