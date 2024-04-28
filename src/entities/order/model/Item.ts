import Metadata from "../../Item/Metadata";

export default class Item {
    // Fields:
    private _id?: string | undefined;
    private _name?: string | undefined;
    private _metadata?: Metadata | undefined;
    private _avatar?: string | undefined;
    private _price?: number | undefined;

    // Constructors:
    public constructor(
        id?: string | undefined,
        name?: string | undefined,
        metadata?: any,
        avatar?: string | undefined
    ) {
        this._id = id;
        this._name = name;
        this._metadata = metadata;
        this._avatar = avatar;
    }

    // Getters / setters:
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

    public get metadata(): Metadata | undefined {
        return this._metadata;
    }
    public set metadata(value: Metadata | undefined) {
        this._metadata = value;
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