import Item from "../../entities/Item/Item";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadAllItemsController implements Controller<LoadAllItemsParam> {
    // Constructors
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onError }: LoadAllItemsParam): Promise<void> {
        await apiFetch(
            {
                method: "GET",
                path: "/item?method=getAll",
                onSuccess: async function (response: Response) {
                    const body: RestResponse<Item[]> = await response.json();

                    if (body.success) {
                        onSuccess(body.result as Item[]);
                    }
                    else {
                        alert(`Code: ${body.code}, Message: ${body.message}`);
                    }
                },
                onFailed: async function (error) {
                    onError(error);
                },
            }
        );
    }
}

export interface LoadAllItemsParam {
    onSuccess(items: Item[]): void;
    onError(error: any): void;
}