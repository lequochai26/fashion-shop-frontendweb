import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class BuyController implements Controller<BuyParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onFailed, onError }: BuyParam): Promise<void> {
        await apiFetch(
            {
                path: "/order?method=create",
                method: "POST",
                onSuccess: async function (response: Response) {
                    const { success, code }: RestResponse<undefined> = await response.json();

                    if (success) {
                        onSuccess();
                    }
                    else {
                        onFailed(code as string);
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
            }
        );
    }
}

export interface BuyParam {
    onSuccess(): void;
    onFailed(reason: string): void;
    onError(error: any): void;
}