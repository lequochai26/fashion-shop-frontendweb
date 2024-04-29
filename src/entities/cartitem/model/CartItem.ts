import CurrencyHelper from "../../../utils/CurrencyHelper";
import Item from "../../Item/model/Item";
import { MetadataHolder } from "../../MetadataHolder";

export default class CartItem extends MetadataHolder {
    // Fields:
    private _item?: Item | undefined;
    private _amount?: number | undefined;

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
        let totalPrice: number = 0;

        if (this._item && this._amount) {
            totalPrice = this._amount * this._item.getPrice(this._metadata);
        }

        return totalPrice;
    }

    public getTotalPriceVND(): string {
        return CurrencyHelper.formatVND(this.calcTotalPrice());
    }

    // Getters / setters:
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