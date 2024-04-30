import CurrencyHelper from "../utils/CurrencyHelper";
import CartItem from "./CartItem";

export default class Cart {
    // Fields:
    private _items: CartItem[];

    // Constructors:
    public constructor(items?: CartItem[] | undefined) {
        this._items = items || [];
    }

    // Methods:
    public calcTotalPrice(): number {
        let totalPrice: number = 0;

        for (const item of this._items) {
            totalPrice += item.calcTotalPrice();
        }

        return totalPrice;
    }

    public getTotalPriceVND(): string {
        return CurrencyHelper.formatVND(this.calcTotalPrice());
    }

    public isEmpty(): boolean {
        return this._items.length <= 0;
    }

    // Getters / setters:
    public get items(): CartItem[] {
        return this._items;
    }
    public set items(value: CartItem[]) {
        this._items = value;
    }
}