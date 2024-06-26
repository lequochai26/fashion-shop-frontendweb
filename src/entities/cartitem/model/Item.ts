import Metadata from "../../Item/Metadata";

export default class Item {
    // Fields:
    private _id?: string | undefined;
    private _name?: string | undefined;
    private _avatar?: string | undefined;
    private _price?: number | undefined;
    private _metadata?: Metadata | undefined;

    // Constructors:
    public constructor(
        id?: string | undefined,
        name?: string | undefined,
        avatar?: string | undefined,
        price?: number | undefined,
        metadata?: Metadata | undefined
    ) {
        this._id = id;
        this._name = name;
        this._avatar = avatar;
        this._price = price;
        this._metadata = metadata;
    }

    // Getters / setters:
    public get metadata(): Metadata | undefined {
        return this._metadata;
    }
    public set metadata(value: Metadata | undefined) {
        this._metadata = value;
    }

    public get price(): number | undefined {
        return this._price;
    }
    public set price(value: number | undefined) {
        this._price = value;
    }

    public get avatar(): string | undefined {
        return this._avatar;
    }
    public set avatar(value: string | undefined) {
        this._avatar = value;
    }
    
    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }

    public get id(): string | undefined // Fields:
    {
        return this._id;
    }
    public set id(value: string | undefined // Fields:
    ) {
        this._id = value;
    }
}