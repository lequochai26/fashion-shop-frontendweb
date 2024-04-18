import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class RegisterController implements Controller<RegisterParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ form, onSuccess, onError, onFailed }: RegisterParam): Promise<void> {
        // Create form data
        const formData: FormData = new FormData();

        formData.set("email", form.email);
        formData.set("password", form.password);
        formData.set("avatar", form.avatar);
        formData.set("fullName", form.fullName);
        formData.set("address", form.address);
        formData.set("phoneNumber", form.phoneNumber);
        formData.set("gender", `${form.gender}`);

        // Make request
        await apiFetch({
            method: "POST",
            path: "/user?method=register",
            body: formData,
            onSuccess: async function (response: Response) {
                const { success, code, message }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess();
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

export interface RegisterParam {
    form: any;
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}