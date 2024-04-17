import CartItem from "../../entities/cartitem/CartItem";
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
                    const { success, code, message, result }: RestResponse<CartItem[]> = await response.json();

                    if (success) {
                        onSuccess(result as CartItem[]);
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