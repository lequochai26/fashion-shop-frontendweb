import CartItem from "../entities/cartitem/CartItem";
import Metadata from "../entities/Item/Metadata";
import RestResponse from "../interfaces/RestResponse";
import { apiFetch } from "../utils/APIFetcher";
import Controller from "./Controller";

export default class UpgradedLoadCartController implements Controller<LoadCartParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onFailed, onError }: LoadCartParam): Promise<void> {
        // Local functions:
        function convertCartItem(input: any): CartItem {
            return {
                amount: input.amount,
                metadata: input.metadata,
                item: {
                    ...input.item,
                    metadata: input.item.metadata && new Metadata(input.item.metadata)
                }
            };
        }

        // Executions:
        await apiFetch({
            path: "/cart",
            method: "GET",
            async onSuccess(response) {
                const { success, result, code, message }: RestResponse<LoadCartResponse> = await response.json();

                if (success && result) {
                    onSuccess(
                        result.sessionCart.map(convertCartItem),
                        result.userCart?.map(convertCartItem)
                    );
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            async onFailed(error) {
                onError(error);
            },
        })
    }
}

export interface LoadCartParam {
    onSuccess(sessionCart: CartItem[], userCart?: CartItem[]): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}

export interface LoadCartResponse {
    sessionCart: any[];
    userCart?: any[];
}