export default class ItemType {
    // Fields:
    private _id?: string | undefined;
    private _name?: string | undefined;
    
    // Constructors:
    public constructor(
        id?: string | undefined,
        name?: string | undefined
    ) {
        this._id = id;
        this._name = name;
    }

    // Getters / setters:
    public get name(): string | undefined // Fields:
    {
        return this._name;
    }
    public set name(value: string | undefined // Fields:
    ) {
        this._name = value;
    }

    public get id(): string | undefined
    // Fields:
    {
        return this._id;
    }
    public set id(value: string | undefined
        // Fields:
    ) {
        this._id = value;
    }

}