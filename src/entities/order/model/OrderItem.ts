import CurrencyHelper from "../../../utils/CurrencyHelper";
import { MetadataHolder } from "../../MetadataHolder";
import Item from "./Item";

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
    public getItemPrice(): number {
        // No metadata case
        if (!this._metadata) {
            if (!this._item?.price) {
                return -1;
            }

            return this._item.price;
        }
        // Has metadata case
        else {
            if (!this._item?.metadata) {
                return -1;
            }

            const mapping = this._item.metadata.getMapping(this._metadata);

            if (!mapping) {
                return -1;
            }

            return mapping.price;
        }
    }

    public getItemPriceVND(): string {
        return CurrencyHelper.formatVND(this.getItemPrice());
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