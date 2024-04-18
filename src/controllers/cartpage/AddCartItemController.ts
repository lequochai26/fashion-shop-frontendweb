import CartItem from "../../entities/cartitem/CartItem";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class AddCartItemController implements Controller<AddCartItemParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ cartItem, onSuccess, onError }: AddCartItemParam): Promise<void> {
        await apiFetch(
            {
                path: "/cart",
                method: "POST",
                body: {
                    id: cartItem.item.id
                },
                onSuccess: async function (response: Response) {
                    const { success, code, message }: RestResponse<undefined> = await response.json();

                    if (success) {
                        onSuccess();
                    }
                    else {
                        console.log(`Code: ${code}, Message: ${message}`);
                    }
                },
                onFailed: async function (error: any) {

                }
            }
        );
    }
}

export interface AddCartItemParam {
    cartItem: CartItem;
    onSuccess(): void;
    onError(error: any): void;
}