import CartItem from "../../../entities/cartitem/model/CartItem";
import RestResponse from "../../../interfaces/RestResponse";
import { apiFetch } from "../../../utils/APIFetcher";
import Controller from "../../Controller";

export default class UpdatedDeleteCartItemController implements Controller<DeleteCartItemParam> {
    // Constructors:
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor() {

    }

    // Methods:
    public async execute({ cartItem, onSuccess, onFailed, onError }: DeleteCartItemParam): Promise<void> {
        await apiFetch(
            {
                path: "/cart",
                method: "PUT",
                body: {
                    items: [
                        {
                            id: cartItem.item?.id,
                            metadata: cartItem.metadata
                        }
                    ]
                },
                onSuccess: async function (response: Response) {
                    const { success, code, message }: RestResponse<undefined> = await response.json();

                    if (success) {
                        onSuccess();
                    }
                    else {
                        if (code && message) {
                            onFailed(code, message);
                        }
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
            }
        );
    }
}

export interface DeleteCartItemParam {
    cartItem: CartItem,
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}