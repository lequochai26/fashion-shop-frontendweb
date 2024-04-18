import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CheckLoggedInController implements Controller<CheckLoggedInParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onSuccess }: CheckLoggedInParam): Promise<void> {
        await apiFetch({
            path: "/user?method=getLoggedIn",
            method: "GET",
            onSuccess: async function (response: Response) {
                const { success }: RestResponse<undefined> = await response.json();
                onSuccess(success);
            },
            onFailed: async function (error: any) {
                onError(error);
            },
        });
    }
}

export interface CheckLoggedInParam {
    onSuccess(loggedIn: boolean): void;
    onError(error: any): void;
}