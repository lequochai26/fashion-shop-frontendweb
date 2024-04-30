import CurrencyHelper from "../utils/CurrencyHelper";
import Item from "./Item";
import { MetadataHolder } from "./MetadataHolder";

export default class OrderItem extends MetadataHolder {
    // Fields:
    private _item: Item;
    private _amount: number;
    private _price: number;

    // Constructors:
    public constructor(
        item?: Item | undefined,
        amount?: number | undefined,
        price?: number | undefined,
        metadata?: any
    ) {
        super(metadata);
        this._item = item;
        this._amount = amount;
        this._price = price;
    }

    // Methods:
    public getPriceVND(): string {
        return CurrencyHelper.formatVND(this._price);
    }

    // Getters / setters:
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }

    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }

    public get item(): Item {
        return this._item;
    }
    public set item(value: Item) {
        this._item = value;
    }
}