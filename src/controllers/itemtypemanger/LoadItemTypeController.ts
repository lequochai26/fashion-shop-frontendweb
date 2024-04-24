import ItemType from "../../entities/Item/ItemType";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadItemItypeController implements Controller<ItemTypeControllerParam>{
    public async execute({onSuccess,onError}: ItemTypeControllerParam): Promise<void> {
        await apiFetch(
            {
                path:"/itemType?method=getAll",
                method:"GET",
                onSuccess:async function (response:Response) {
                    const {success,message,code,result}= await response.json();

                    if(success){
                        onSuccess(result as ItemType[]);
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

export interface ItemTypeControllerParam{
    onSuccess(itemType: ItemType[]) : void;
    onError(error:any): void;
    
}