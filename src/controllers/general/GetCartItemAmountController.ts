import CartItem from "../../entities/cartitem/CartItem";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class GetCartItemAmountController implements Controller<GetCartItemAmountParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onSuccess, onError }: GetCartItemAmountParam): Promise<void> {
        await apiFetch(
            {
                path: "/cart",
                method: "GET",
                onSuccess: async function (response: Response) {
                    const body: RestResponse<CartItem[]> = await response.json();

                    if (body.success) {
                        onSuccess((body.result as CartItem[]).length);
                    }
                    else {
                        alert(`Code: ${body.code}, Message: ${body.message}`);
                    }
                },
                onFailed: async function (error) {
                    onError(error);
                },
            }
        )
    }
}

export interface GetCartItemAmountParam {
    onSuccess(amount: number): void;
    onError(error: any): void;
}