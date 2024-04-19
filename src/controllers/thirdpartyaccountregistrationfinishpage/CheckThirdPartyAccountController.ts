import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CheckThirdPartyAccountController implements Controller<CheckThirdPartyAccountParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onError }: CheckThirdPartyAccountParam): Promise<void> {
        await apiFetch({
            path: "/user?method=getThirdPartyAccount",
            method: "GET",
            onSuccess: async function (response: Response) {
                const { result }: RestResponse<undefined> = await response.json();

                if (result) {
                    onSuccess(result !== null);
                }
            },
            onFailed: async function (error) {
                onError(error);
            },
        });
    }
}

export interface CheckThirdPartyAccountParam {
    onSuccess(access: boolean): void;
    onError(error: any): void;
}