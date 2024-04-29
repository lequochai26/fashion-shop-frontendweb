import CurrencyHelper from "../../../utils/CurrencyHelper";
import MetadataHelper from "../../../utils/MetadataHelper";
import Item from "../../Item/model/Item";

export default class CartItem {
    // Fields:
    private _item?: Item | undefined;
    private _amount?: number | undefined;
    private _metadata?: any;

    // Constructors:
    public constructor(
        item?: Item | undefined,
        amount?: number | undefined,
        metadata?: any | undefined
    ) {
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

    public toStringMetadata(): string | undefined {
        return this._metadata && MetadataHelper.toStringMetadata(this._metadata);
    }

    // Getters / setters:
    public get metadata(): any {
        return this._metadata;
    }
    public set metadata(value: any) {
        this._metadata = value;
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