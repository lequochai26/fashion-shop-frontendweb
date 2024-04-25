import CartItem from "../../entities/cartitem/CartItem";
import Metadata from "../../entities/Item/Metadata";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class LoadCartController implements Controller<LoadCartParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onError }: LoadCartParam): Promise<void> {
        await apiFetch(
            {
                method: "GET",
                path: "/cart",
                onSuccess: async function (response) {
                    const { success, code, message, result }: RestResponse<any[]> = await response.json();

                    if (success) {
                        onSuccess(
                            (result as any[])
                            .map(
                                cartItem => ({
                                    amount: cartItem.amount,
                                    metadata: cartItem.metadata,
                                    item: {
                                        ...cartItem.item,
                                        metadata: cartItem.item.metadata && new Metadata(cartItem.item.metadata)
                                    }
                                })
                            )
                        );
                    }
                    else {
                        alert(`Code: ${code}, Message: ${message}`);
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
            }
        );
    }
}

export interface LoadCartParam {
    onSuccess(cart: CartItem[]): void;
    onError(error: any): void;
}