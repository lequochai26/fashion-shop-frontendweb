import OrderConverter from "../../converters/OrderConverter";
import Order from "../../entities/order/model/Order";
import OrderInfo from "../../entities/order/upgrade/OrderInfo";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Converter from "../../utils/Converter";
import Controller from "../Controller";

export default class UpgradedLoadOrderedOrdersController  implements Controller <UpgradedLoadOrderedOrdersParams> {
    //Fields:
    private orderConverter: Converter< OrderInfo, Order>
    //Constructors:
    public constructor() {
        this.orderConverter = OrderConverter.getInstance();
    }

    //Methods:
    public async execute({ onSuccess, onFailed, onError }: UpgradedLoadOrderedOrdersParams): Promise<void> {
        //Self difinition
        const self = this;
        //fetch API
        await apiFetch(
            {
                path: "/order?method=getOrdered",
                method: "GET",
                onSuccess: async function(response: Response) {
                    const { success, code, message, result}: RestResponse<OrderInfo[]> = await response.json();

                    if(success && result) {
                        onSuccess(
                            result.map(
                                orderInfo => self.orderConverter.convert(orderInfo)
                            )
                        )
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

export interface UpgradedLoadOrderedOrdersParams {
    onSuccess(orders: Order[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}