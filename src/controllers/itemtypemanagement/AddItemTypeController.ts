
import ItemType from "../../entities/Item/ItemType";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class AddItemTypeController implements Controller<AddItemTypeParam>{

    public constructor(){

    }

    //method
    public async execute({itemTypeInfo,onSuccess,onError,onFailed}: AddItemTypeParam): Promise<void> {
        //create from data
        const formData : FormData = new FormData();

        formData.set("id",itemTypeInfo.id);
        formData.set("name",itemTypeInfo.name);
        

        //api
        await apiFetch({
            method:"POST",
            path:"/itemType",
            body:formData,
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
    
    itemTypeInfo: any,
    onSuccess(): void,
    onError(error: any): void,
    onFailed(code:string,message:string): void;

}


