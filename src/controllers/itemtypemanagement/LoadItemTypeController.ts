
import ItemType from "../../entities/itemtype/ItemType";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadItemItypeController implements Controller<LoadItemTypeControllerParam>{

    //constructor
    public constructor(){}

    public async execute({onSuccess,onError}: LoadItemTypeControllerParam): Promise<void> {
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

export interface LoadItemTypeControllerParam{
    onSuccess(itemType: ItemType[]) : void;
    onError(error:any): void;
    
}