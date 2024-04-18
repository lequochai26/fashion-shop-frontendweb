import OrderInfo from "../../entities/order/Order";
import Order from "../../entities/order/Order";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadOrderController implements Controller<LoadOrderParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ id, onError, onSuccess }: LoadOrderParam): Promise<void> {
        if (!id) {
            onSuccess(null);
            return;
        }

        await apiFetch({
            method: "GET",
            path: `/order?method=get&id=${id}`,
            onSuccess: async function (response: Response) {
                const { success, result }: RestResponse<any> = await response.json();

                if (success) {
                    onSuccess(result ? { ...result, date: new Date(result.date) } : null);
                }
                else {
                    onSuccess(null);
                }
            },
            onFailed: async function (error: any) {
                
            },
        });
    }
}

export interface LoadOrderParam {
    id: string | null;
    onSuccess(order: OrderInfo | null): void;
    onError(error: any): void;
}