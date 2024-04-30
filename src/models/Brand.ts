import Item from "./Item";

export default class Brand {
    // Fields:
    private _id: string;
    private _name: string;
    private _items: Item[];

    // Constructors:
    public constructor(
        id?: string,
        name?: string,
        items?: Item[]
    ) {
        this._id = id;
        this._name = name;
        this._items = items || [];
    }

    // Getters / setters:
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get items(): Item[] {
        return this._items;
    }
    public set items(value: Item[]) {
        this._items = value;
    }
}