import CurrencyHelper from "../../../utils/CurrencyHelper";
import Metadata, { Mapping } from "../Metadata";
import Brand from "./Brand";
import ItemType from "./ItemType";

export default class Item {
    // Fields:
    private _id?: string | undefined;
    private _avatar?: string | undefined;
    private _name?: string | undefined;
    private _description?: string | undefined;
    private _price?: number | undefined;
    private _buyPrice?: number | undefined;
    private _amount?: number | undefined;
    private _gender?: boolean | undefined;
    private _metadata?: Metadata | undefined;
    private _type?: ItemType | undefined;
    private _brand?: Brand | undefined;
    private _images: string[];
    private _orders: string[];

    // Constructors:
    public constructor(
        id?: string | undefined,
        avatar?: string | undefined,
        name?: string | undefined,
        description?: string | undefined,
        price?: number | undefined,
        buyPrice?: number | undefined,
        amount?: number | undefined,
        gender?: boolean | undefined,
        metadata?: Metadata | undefined,
        type?: ItemType | undefined,
        brand?: Brand | undefined,
        images?: string[] | undefined,
        orders?: string[] | undefined
    ) {
        this._id = id;
        this._avatar = avatar;
        this._name = name;
        this._description = description;
        this._price = price;
        this._buyPrice = buyPrice;
        this._amount = amount;
        this._gender = gender;
        this._metadata = metadata;
        this._type = type;
        this._brand = brand;
        this._images = images || [];
        this._orders = orders || [];
    }

    // Methods:
    public isAvailable(): boolean {
        if (!this._metadata) {
            if (this._amount !== undefined) {
                return this._amount > 0;
            }
        }
        else {
            for (const mapping of this._metadata.Mappings) {
                if (mapping.amount > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    public getLowestPrice(): number | undefined {
        if (!this._metadata) {
            if (this._price !== undefined) {
                return this._price;
            }
        }
        else {
            let lowestPrice: number = this._metadata.Mappings.sort(
                (a, b) => a.price - b.price
            )[0].price;
            return lowestPrice;
        }
    }

    public getHighestPrice(): number | undefined {
        if (!this._metadata) {
            if (this._price !== undefined) {
                return this._price;
            }
        }
        else {
            let highestPrice: number = this._metadata.Mappings.sort(
                (a, b) => b.price - a.price
            )[0].price;
            return highestPrice;
        }
    }

    public getHighestPriceVND(): string | undefined {
        const highestPrice: number | undefined = this.getHighestPrice();
        if (highestPrice !== undefined) {
            return CurrencyHelper.formatVND(highestPrice);
        }
    }

    public getLowestPriceVND(): string | undefined {
        const lowestPrice: number | undefined = this.getLowestPrice();
        if (lowestPrice !== undefined) {
            return CurrencyHelper.formatVND(lowestPrice);
        }
    }

    public getPrice(metadata?: any): number | undefined {
        if (!this._metadata) {
            if (this._price !== undefined) {
                return this._price;
            }
        }
        else if (metadata) {
            const mapping: Mapping | undefined = this._metadata.getMapping(metadata);

            if (mapping) {
                return mapping.price;
            }
        }
    }

    public getPriceVND(metadata?: any): string | undefined {
        const price: number | undefined = this.getPrice(metadata);
        if (price !== undefined) {
            return CurrencyHelper.formatVND(price);
        }
    }

    public getBuyPrice(metadata?: any): number | undefined {
        if (!this._metadata) {
            if (this._buyPrice !== undefined) {
                return this._buyPrice;
            }
        }
        else if (metadata) {
            const mapping = this._metadata.getMapping(metadata);

            if (mapping) {
                return mapping.buyPrice;
            }
        }
    }

    public getAmount(metadata?: any): number | undefined {
        if (!this._metadata) {
            if (this._amount !== undefined) {
                return this._amount;
            }
        }
        else if (metadata) {
            const mapping = this._metadata.getMapping(metadata);

            if (mapping) {
                return mapping.amount;
            }
        }
    }

    // Getters / setters:
    public get orders(): string[] {
        return this._orders;
    }
    public set orders(value: string[]) {
        this._orders = value;
    }

    public get images(): string[] {
        return this._images;
    }
    public set images(value: string[]) {
        this._images = value;
    }

    public get brand(): Brand | undefined {
        return this._brand;
    }
    public set brand(value: Brand | undefined) {
        this._brand = value;
    }

    public get type(): ItemType | undefined {
        return this._type;
    }
    public set type(value: ItemType | undefined) {
        this._type = value;
    }

    public get metadata(): Metadata | undefined {
        return this._metadata;
    }
    public set metadata(value: Metadata | undefined) {
        this._metadata = value;
    }

    public get gender(): boolean |
        // Fields:
        undefined {
        return this._gender;
    }
    public set gender(value: boolean |
        // Fields:
        undefined) {
        this._gender = value;
    }

    public get amount(): number | undefined {
        return this._amount;
    }
    public set amount(value: number | undefined) {
        this._amount = value;
    }

    public get buyPrice(): number |
        // Fields:
        undefined {
        return this._buyPrice;
    }
    public set buyPrice(value: number |
        // Fields:
        undefined) {
        this._buyPrice = value;
    }

    public get price(): number | undefined {
        return this._price;
    }
    public set price(value: number | undefined) {
        this._price = value;
    }

    public get description(): string | // Fields:
        undefined {
        return this._description;
    }
    public set description(value: string | // Fields:
        undefined) {
        this._description = value;
    }

    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }

    public get avatar(): string | undefined {
        return this._avatar;
    }
    public set avatar(value: string | undefined) {
        this._avatar = value;
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