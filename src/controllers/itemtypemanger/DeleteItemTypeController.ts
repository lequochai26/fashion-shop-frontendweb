import ItemType from "../../entities/Item/ItemType";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class DeleteItemTypeController implements Controller<DeleteItemTypeParam>{
    public async execute({id,onSuccess,onError}: DeleteItemTypeParam): Promise<void> {
       await apiFetch(
        {
            path : `/itemType?id=${id}`,
            method : "DELETE",
            onSuccess:async function (response:Response) {
                const {success,message,code,result}= await response.json();

                if(success){
                    onSuccess();
                }else{
                    alert(`Code:${code} - message:${message}`);
                }
            },
            onFailed:async function (error:any) {
                onError(error);
            }
        }
       )
    }

}

export interface DeleteItemTypeParam{
    id:string,
    onSuccess(): void;
    onError(error:any):void;

}