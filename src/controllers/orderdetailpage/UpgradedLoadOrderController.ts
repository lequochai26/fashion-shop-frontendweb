import OrderConverter from "../../converters/OrderConverter";
import Order from "../../entities/order/model/Order";
import OrderInfo from "../../entities/order/upgrade/OrderInfo";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Converter from "../../utils/Converter";
import Controller from "../Controller";

export default class UpgradedLoadOrderController implements Controller<LoadOrderParam> {
    // Fields:
    private orderConverter: Converter<OrderInfo, Order>;

    // Constructors:
    public constructor() {
        this.orderConverter = OrderConverter.getInstance();
    }

    // Methods:
    public async execute({ id, onSuccess, onFailed, onError }: LoadOrderParam): Promise<void> {
        // Self definition
        const self = this;

        // API Fetching
        await apiFetch({
            path: `/order?method=get&id=${id}`,
            method: "GET",
            async onSuccess(response) {
                const { success, result, code, message }: RestResponse<any> = await response.json();

                if (success && result) {
                    // Default, date is string, need to convert to Date object
                    result.date = new Date(result.date);

                    // Converting result into Order object
                    const order: Order = self.orderConverter.convert(result);

                    // Call onSuccess callback
                    onSuccess(order);
                }
                else {
                    if (!code || !message) {
                        onFailed("UNKNOWN", "Unknown");
                    }
                    else {
                        onFailed(code, message);
                    }
                }
            },
            async onFailed(error) {
                onError(error);
            },
        })
    }
}

export interface LoadOrderParam {
    id: string;
    onSuccess(order: Order): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}