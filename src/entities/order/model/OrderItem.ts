import CurrencyHelper from "../../../utils/CurrencyHelper";
import { MetadataHolder } from "../../MetadataHolder";
import Item from "../../Item/model/Item";

export default class OrderItem extends MetadataHolder {
    // Fields:
    private _item?: Item | undefined;
    private _amount?: number | undefined;
    private _price?: number | undefined;

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
        return CurrencyHelper.formatVND(this._price || -1);
    }

    // Getters / setters:
    public get price(): number | undefined {
        return this._price;
    }
    public set price(value: number | undefined) {
        this._price = value;
    }

    public get amount(): number | undefined {
        return this._amount;
    }
    public set amount(value: number | undefined) {
        this._amount = value;
    }

    public get item(): Item | undefined {
        return this._item;
    }
    public set item(value: Item | undefined) {
        this._item = value;
    }
}