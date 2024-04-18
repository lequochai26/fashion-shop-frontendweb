import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CancelOrderController implements Controller<CancelOrderParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ id, onSuccess, onError, onFailed }: CancelOrderParam): Promise<void> {
        await apiFetch({
            method: "PUT",
            path: `/order?method=cancel&id=${id}`,
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

export interface CancelOrderParam {
    id: string;
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}