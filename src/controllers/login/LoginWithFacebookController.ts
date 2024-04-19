import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import Controller from "../Controller";
import { apiFetch } from "../../utils/APIFetcher";
import RestResponse from "../../interfaces/RestResponse";

export default class LoginWithFacebookController implements Controller<LoginWithFacebookParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ userInfo, onError, onFailed, onSuccess }: LoginWithFacebookParam): Promise<void> {
        await apiFetch({
            path: "/user?method=loginWithFacebook",
            method: "POST",
            body: userInfo,
            onSuccess: async function (response) {
                const { success, code, message }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess(code);
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            onFailed: async function (error) {
                onError(error);
            },
        });
    }
}

export interface LoginWithFacebookParam {
    userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse;
    onSuccess(code: string | undefined): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}