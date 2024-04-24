import ItemType from "../../entities/itemtype/ItemType";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadAllItemTypesController implements Controller<LoadAllItemTypesParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onFailed, onSuccess }: LoadAllItemTypesParam): Promise<void> {
        await apiFetch({
            method: "GET",
            path: "/itemType?method=getAll",
            async onSuccess(response) {
                const body: RestResponse<ItemType[]> = await response.json();

                if (body.success) {
                    onSuccess(body.result as ItemType[]);
                }
                else {
                    onFailed(body.code as string, body.message as string);
                }
            },
            async onFailed(error) {
                onError(error);
            },
        });
    }
}

export interface LoadAllItemTypesParam {
    onSuccess(itemTypes: ItemType[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}