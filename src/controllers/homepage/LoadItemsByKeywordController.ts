import Item from "../../entities/Item/Item";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadItemsByKeywordController implements Controller<LoadItemsByKeywordParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ keyword, onSuccess, onError }: LoadItemsByKeywordParam): Promise<void> {
        // Keyword validating
        if (!keyword) {
            alert("Vui lòng nhập từ khóa tìm kiếm!");
            return;
        }

        // API Fetching
        await apiFetch({
            method: "GET",
            path: `/item?method=getByKeyword&keyword=${keyword}`,
            onSuccess: async function (response: Response) {
                // Get body
                const body: RestResponse<Item[]> = await response.json();

                // Check if success true
                if (body.success) {
                    onSuccess(body.result as Item[]);
                }
                else {
                    alert(`Code: ${body.code}, Message: ${body.message}`);
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            },
        });
    }
}

export interface LoadItemsByKeywordParam {
    keyword: string;
    onSuccess(items: Item[]): void;
    onError(error: any): void;
}