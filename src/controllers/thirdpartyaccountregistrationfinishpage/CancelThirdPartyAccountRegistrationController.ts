import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CancelThirdPartyAccountRegistrationController implements Controller<CancelThirdPartyAccountRegistrationParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onFailed, onSuccess }: CancelThirdPartyAccountRegistrationParam): Promise<void> {
        await apiFetch({
            method: "DELETE",
            path: "/user?method=cancelThirdPartyAccountRegistration",
            onSuccess: async function (response) {
                const { success, code, message }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess();
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            onFailed: async function (error) {
                onError(error);
            }
        });
    }
}

export interface CancelThirdPartyAccountRegistrationParam {
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}