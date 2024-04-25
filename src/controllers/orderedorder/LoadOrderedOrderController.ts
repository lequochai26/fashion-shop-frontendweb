import path from "path";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";
import OrderInfo from "../../entities/order/Order";

export default class LoadOrderedOrderController implements Controller<OrderedOrderControllerParam>{
    //Constructors:
    public constructor() {}

    //Methods:
    public async execute({ onSuccess, onFailed, onError }: OrderedOrderControllerParam): Promise<void> {
        await apiFetch(
            {
                path : "/order?method=getOrdered",
                method: "GET",
                onSuccess: async function (response: Response) {
                    const {success, message, code, result} = await response.json();

                    if(success) {
                        onSuccess(result as OrderInfo[]);
                    } else {
                        onFailed(code as string, message as string);
                    }
                },
                onFailed: async function (error:any) {
                    onError(error);
                }
            }
        )
    }
    
}

export interface OrderedOrderControllerParam{
    onSuccess(order: OrderInfo[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}