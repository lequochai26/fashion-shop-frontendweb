import path from "path";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";
import OrderInfo from "../../entities/order/Order";

export default class LoadOrderedOrderController implements Controller<OrderedOrderControllerParam>{
    //Constructors:
    public constructor() {}

    //Methods:
    public async execute({ onSuccess, onError }: OrderedOrderControllerParam): Promise<void> {
        await apiFetch(
            {
                path : "/order?method=getOrdered",
                method: "GET",
                onSuccess: async function (response: Response) {
                    const {success, message, code, result} = await response.json();

                    if(success) {
                        onSuccess(result as OrderInfo[]);
                    } else {
                        alert(`Code: ${code} - message: ${message}`);
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
    onError(error: any): void;
}