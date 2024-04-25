import Item from "../../entities/Item/Item";
import Metadata from "../../entities/Item/Metadata";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class RemoveItemController implements Controller<RemoveItemParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ target, onSuccess, onFailed, onError }: RemoveItemParam): Promise<void> {
        // API fetching
        await apiFetch({
            method: "DELETE",
            path: `/item?id=${target.id}`,
            async onSuccess(response) {
                const { success, code, message }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess();
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            async onFailed(error) {
                onError(error);
            },
        });
    }
}

export interface RemoveItemParam {
    target: Item,
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}