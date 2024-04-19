import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class ThirdPartyAccountRegistrationFinishController implements Controller<ThirdPartyAccountRegistrationFinishParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ form, onSuccess, onError, onFailed }: ThirdPartyAccountRegistrationFinishParam): Promise<void> {
        await apiFetch(
            {
                method: "POST",
                path: "/user?method=thirdPartyAccountRegistrationFinish",
                body: form,
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
            }
        );
    }
}

export interface ThirdPartyAccountRegistrationFinishParam {
    form: any;
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}