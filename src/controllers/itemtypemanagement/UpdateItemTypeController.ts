import { data } from "autoprefixer";
import Controller from "../Controller";
import { apiFetch } from "../../utils/APIFetcher";
import RestResponse from "../../interfaces/RestResponse";

export default class UpdateItemTypeController implements Controller<UpdateItemTypeParam>{
    public async execute({itemType,onSuccess,onFailed,onError}: UpdateItemTypeParam): Promise<void> {
       //create from data

       const fromData : FormData = new FormData();

       if(itemType.name !== undefined){
            fromData.set("name",itemType.name);
       }

       await apiFetch(
        {
            method:"PUT",
            path:"/itemType",
            body:fromData,
            onSuccess: async function (response:Response) {
                //get body
                const body : RestResponse<undefined> = await response.json();

                if(body.success){
                    onSuccess();
                }else{
                    onFailed(body.code as string, body.message as string)
                }
            },
            onFailed: async function (error:any) {
                onError(error);
            }
        }
       )
    }
    
}
export interface UpdateItemTypeParam{
    itemType: any;
    onSuccess(): void;
    onFailed(code: string,message:string): void;
    onError(error: any): void;
}