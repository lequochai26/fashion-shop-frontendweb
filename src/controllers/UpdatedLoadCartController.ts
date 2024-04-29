import CartConverter from "../converters/CartConverter";
import Cart from "../entities/cartitem/model/Cart";
import CartItemInfo from "../entities/cartitem/upgrade/CartItemInfo";
import RestResponse from "../interfaces/RestResponse";
import { apiFetch } from "../utils/APIFetcher";
import Converter from "../utils/Converter";
import Controller from "./Controller";

export default class UpdatedLoadCartController implements Controller<LoadCartParam> {
    // Fields:
    private cartConverter: Converter<CartItemInfo[], Cart>;

    // Constructors:
    public constructor() {
        this.cartConverter = CartConverter.getInstance();
    }

    // Methods:
    public async execute({ onSuccess, onFailed, onError }: LoadCartParam): Promise<void> {
        // Self definition:
        const self = this;

        // API Fetching:
        await apiFetch({
            path: "/cart",
            method: "GET",
            async onSuccess(response) {
                const { success, result, code, message }: RestResponse<LoadCartResponse> = await response.json();

                if (success && result) {
                    onSuccess(
                        self.cartConverter.convert(result.sessionCart),
                        result.userCart
                        &&
                        self.cartConverter.convert(result.userCart)
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
    onSuccess(sessionCart: Cart, userCart?: Cart): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}

export interface LoadCartResponse {
    sessionCart: CartItemInfo[];
    userCart?: CartItemInfo[];
}