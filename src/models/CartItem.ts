import CurrencyHelper from "../utils/CurrencyHelper";
import Item from "./Item";
import { MetadataHolder } from "./MetadataHolder";

export default class CartItem extends MetadataHolder {
    // Fields:
    private _item: Item;
    private _amount: number;

    // Constructors:
    public constructor(
        item?: Item | undefined,
        amount?: number | undefined,
        metadata?: any | undefined
    ) {
        super(metadata);

        this._item = item;
        this._amount = amount;
        this._metadata = metadata;
    }

    // Methods:
    public calcTotalPrice(): number {
        return this._amount * this._item.getPrice(this._metadata);
    }

    public getTotalPriceVND(): string {
        return CurrencyHelper.formatVND(this.calcTotalPrice());
    }

    // Getters / setters:
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