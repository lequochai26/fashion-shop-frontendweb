import ItemType from "../../entities/Item/ItemType";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadItemTypeByKeywordController implements Controller<LoadItemTypeByKeywordParam>{
    //contrustor
    public constructor(){

    }
    
    public async execute({keyword,onSuccess,onError}: LoadItemTypeByKeywordParam): Promise<void> {
        if(!keyword){
            alert("Vui lòng nhập từ khóa tìm kiếm!");
        }

        await apiFetch({
            method:"GET",
            path:`/itemType?method=getByKeyword&keyword=${keyword}`,
            onSuccess: async function (response: Response) {
                // Get body
                const body: RestResponse<ItemType[]> = await response.json();

                // Check if success true
                if (body.success) {
                    onSuccess(body.result as ItemType[]);
                }
                else {
                    alert(`Code: ${body.code}, Message: ${body.message}`);
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            },
        })
    }
    
}




export interface LoadItemTypeByKeywordParam{
    keyword : string;
    onSuccess(itemType: ItemType[]): void;
    onError(error:any): void;

}