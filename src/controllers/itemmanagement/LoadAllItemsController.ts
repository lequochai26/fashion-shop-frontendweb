import Item from "../../entities/Item/Item";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadAllItemsController implements Controller<LoadAllItemsParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onFailed, onError }: LoadAllItemsParam): Promise<void> {
        await apiFetch(
            {
                method: "GET",
                path: "/item?method=getAll",
                async onSuccess(response) {
                    const body: RestResponse<Item[]> = await response.json();

                    if (body.success) {
                        onSuccess(body.result as Item[])
                    }
                    else {
                        onFailed(body.code as string, body.message as string);
                    }
                },
                async onFailed(error) {
                    onError(error);
                },
            }
        );
    }
}

export interface LoadAllItemsParam {
    onSuccess(items: Item[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}