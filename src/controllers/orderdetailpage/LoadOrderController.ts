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
    public async execute({ id, onError, onSuccess, onFailed }: LoadOrderParam): Promise<void> {
        if (!id) {
            onSuccess(null);
            return;
        }

        await apiFetch({
            method: "GET",
            path: `/order?method=get&id=${id}`,
            onSuccess: async function (response: Response) {
                const { success, result, code, message }: RestResponse<any> = await response.json();

                if (success) {
                    onSuccess(result ? { ...result, date: new Date(result.date) } : null);
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            },
        });
    }
}

export interface LoadOrderParam {
    id: string | null;
    onSuccess(order: OrderInfo | null): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}