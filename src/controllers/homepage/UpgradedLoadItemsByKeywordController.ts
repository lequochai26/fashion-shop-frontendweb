import Item from "../../entities/Item/model/Item";
import ItemInfo from "../../entities/Item/Item";
import Converter from "../../utils/Converter";
import Controller from "../Controller";
import ItemConverter from "../../converters/ItemConverter";
import { apiFetch } from "../../utils/APIFetcher";
import RestResponse from "../../interfaces/RestResponse";

export default class UpgradedLoadItemsByKeywordController implements Controller<LoadItemsByKeywordParam> {
    // Fields:
    private itemConverter: Converter<ItemInfo, Item>;

    // Constructors:
    public constructor() {
        this.itemConverter = ItemConverter.getInstance();
    }

    // Methods:
    public async execute({ keyword, onEmpty, onSuccess, onFailed, onError }: LoadItemsByKeywordParam): Promise<void> {
        // Keyword validating
        if (!keyword) {
            return onEmpty();
        }

        // Self definition
        const self = this;

        // API Fetching
        await apiFetch({
            path: `/item?method=getByKeyword&keyword=${keyword}`,
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

export interface LoadItemsByKeywordParam {
    keyword: string;
    onEmpty(): void;
    onSuccess(items: Item[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}