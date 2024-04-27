import Controller from "./Controller";
import { LoadCartParam } from "./UpgradedLoadCartController";

export default class UpgradedGetCartItemAmountController implements Controller<GetCartItemAmountParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ loadCartController,  onSuccess, onFailed, onError }: GetCartItemAmountParam): Promise<void> {
        await loadCartController.execute({
            onSuccess(sessionCart, userCart) {
                if (userCart) {
                    onSuccess(userCart.length);
                }
                else {
                    onSuccess(sessionCart.length);
                }
            },
            onFailed,
            onError,
        });
    }
}

export interface GetCartItemAmountParam {
    loadCartController: Controller<LoadCartParam>;
    onSuccess(amount: number): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}