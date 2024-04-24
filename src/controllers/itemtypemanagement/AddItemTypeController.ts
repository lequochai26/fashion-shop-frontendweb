
import ItemType from "../../entities/Item/ItemType";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class AddItemTypeController implements Controller<AddItemTypeParam>{

    public constructor(){

    }

    //method
    public async execute({itemType,onSuccess,onError,onFailed}: AddItemTypeParam): Promise<void> {
        // if(!id){
        //     alert("Vui lòng nhập mã loại sản phẩm");
        // }

        // if(!name){
        //     alert("Vui lòng nhập tên loại sản phẩm!");
        // }
        

        //api
        await apiFetch({
            method:"POST",
            path:"/itemType",
            body:{id: itemType.id,
                 name: itemType.name
            },
            onSuccess:async function (response:Response) {
                const {success,code,message}: RestResponse<undefined> = await response.json();

                if(success){
                    onSuccess();
                }else{
                    onFailed(code as string,message as string);
                }
            },
            onFailed: async function (error:any) {
                onError(error);
            }
        })

    }
    
}


export interface AddItemTypeParam{
    
    itemType: ItemType,
    onSuccess(): void,
    onError(error: any): void,
    onFailed(code:string,message:string): void;

}


