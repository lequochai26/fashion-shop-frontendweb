import Item from "../../entities/Item/model/Item";
import ItemInfo from "../../entities/Item/Item";
import Converter from "../../utils/Converter";
import Controller from "../Controller";
import ItemConverter from "../../converters/ItemConverter";
import { apiFetch } from "../../utils/APIFetcher";
import RestResponse from "../../interfaces/RestResponse";

export default class UpgradedLoadAllItemsController implements Controller<LoadAllItemsParam> {
    // Fields:
    private itemConverter: Converter<ItemInfo, Item>;

    // Constructors:
    public constructor() {
        this.itemConverter = new ItemConverter();
    }

    // Methods:
    public async execute({ onSuccess, onFailed, onError }: LoadAllItemsParam): Promise<void> {
        // Self definition
        const self = this;

        // API Fetching
        await apiFetch({
            path: "/item?method=getAll",
            method: "GET",
            async onSuccess(response) {
                const { success, result, code, message }: RestResponse<ItemInfo[]> = await response.json();

                if (success && result) {
                    onSuccess(
                        result.map(
                            itemInfo => self.itemConverter.convert(itemInfo)
                        )
                    );
                }
                else {
                    if (code && message) {
                        onFailed(code, message);
                    }
                }
            },
            async onFailed(error) {
                onError(error);
            },
        })
    }
}

export interface LoadAllItemsParam {
    onSuccess(items: Item[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}