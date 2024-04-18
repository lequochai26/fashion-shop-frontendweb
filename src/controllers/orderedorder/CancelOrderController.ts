import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class CancelOrderController implements Controller<CancelOrderControllerParam>{
    //Constructors:
    public constructor() {};

    //Methods:
    public async execute({id, onSuccess, onFailed, onError}: CancelOrderControllerParam): Promise<void> {
        await apiFetch(
            {
                path: `/order?method=cancel&id=${id}`,
                method: "PUT",
                onSuccess: async function(response: Response) {
                    const {success, message, code} = await response.json();

                    if(success){
                        onSuccess();
                    } else {
                        onFailed(code as string, message as string);
                    }
                    
                },
                onFailed: async function(error: any) {
                    onError(error);
                },
            }
        )
    }
}

export interface CancelOrderControllerParam{
    id: string;
    onSuccess() : void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}