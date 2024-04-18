import CartItem from "../../entities/cartitem/CartItem";
import Controller from "../Controller";

export default class BuyController implements Controller<BuyParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ cart, onSuccess, onFailed, onError }: BuyParam): Promise<void> {
        
    }
}

export interface BuyParam {
    cart: CartItem[];
    onSuccess(): void;
    onFailed(reason: string): void;
    onError(error: any): void;
}