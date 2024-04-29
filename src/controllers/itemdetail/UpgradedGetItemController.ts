import Item from "../../entities/Item/model/Item";
import Converter from "../../utils/Converter";
import Controller from "../Controller";
import ItemInfo from "../../entities/Item/Item";
import ItemConverter from "../../converters/ItemConverter";
import { apiFetch } from "../../utils/APIFetcher";
import RestResponse from "../../interfaces/RestResponse";

export default class UpgradedGetItemController implements Controller<UpgradedGetItemParam> {
    //Fields:
    private itemConverter: Converter<ItemInfo, Item>

    //Constructors:
    public constructor() {
        this.itemConverter = ItemConverter.getInstance();
    }

    //Method:
    public async execute({ id, onSuccess, onFailed, onError}: UpgradedGetItemParam): Promise<void> {
        //Self difinition
        const self = this;

        //Fetch API
        await apiFetch(
            {
                path: `/item?method=get&id=${id}`,
                method: "GET",
                onSuccess: async function (response) {
                    const { success , code, message, result }: RestResponse<ItemInfo> = await response.json();

                    if(success && result) {
                        onSuccess(
                            self.itemConverter.convert(result)
                        );
                    } else {
                        onFailed(code as string, message as string);
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                },
            }
        )
    }
}

export interface UpgradedGetItemParam {
    id: string;
    onSuccess(item: Item): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}