import CartItem from "../../../entities/cartitem/model/CartItem";
import RestResponse from "../../../interfaces/RestResponse";
import { apiFetch } from "../../../utils/APIFetcher";
import Controller from "../../Controller";

export default class UpdatedRemoveCartItemController implements Controller<RemoveCartItemParam> {
    // Constructors:
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor() {

    }

    // Methods:
    public async execute({ cartItem, onSuccess, onFailed, onError }: RemoveCartItemParam): Promise<void> {
        await apiFetch({
            path: "/cart",
            method: "PUT",
            body: {
                items: [
                    {
                        id: cartItem.item?.id,
                        metadata: cartItem.metadata,
                        amount: 1
                    }
                ]
            },
            onSuccess: async function (response: Response) {
                const { success, message, code }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess();
                }
                else {
                    if (message && code) {
                        onFailed(code, message);
                    }
                }
            },
            onFailed: async function (error: any) {
                onError(error);
            }
        });
    }
}

export interface RemoveCartItemParam {
    cartItem: CartItem;
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}