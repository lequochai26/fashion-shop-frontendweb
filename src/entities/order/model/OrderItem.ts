import Item from "./Item";

export default class OrderItem {
    // Fields:
    private _item?: Item | undefined;
    private _amount?: number | undefined;
    private _price?: number | undefined;
    private _metadata?: any;

    // Constructors:
    public constructor(
        item?: Item | undefined,
        amount?: number | undefined,
        price?: number | undefined,
        metadata?: any
    ) {
        this._item = item;
        this._amount = amount;
        this._price = price;
        this._metadata = metadata;
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

    // Getters / setters:
    public get metadata(): any {
        return this._metadata;
    }
    public set metadata(value: any) {
        this._metadata = value;
    }

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