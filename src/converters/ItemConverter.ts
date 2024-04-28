import ItemInfo from "../entities/Item/Item";
import Metadata from "../entities/Item/Metadata";
import Brand from "../entities/Item/model/Brand";
import Item from "../entities/Item/model/Item";
import ItemType from "../entities/Item/model/ItemType";
import Converter from "../utils/Converter";

export default class ItemConverter implements Converter<ItemInfo, Item> {
    // Static fields:
    private static instance: ItemConverter = new ItemConverter();

    // Static methods:
    public static getInstance(): ItemConverter {
        return ItemConverter.instance;
    }

    // Constructors:
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor() {

    }

    // Methods:
    public convert(from: ItemInfo): Item {
        const item: Item = new Item(
            from.id,
            from.avatar,
            from.name,
            from.description,
            from.price,
            from.buyPrice,
            from.amount,
            from.gender,
            from.metadata
            &&
            new Metadata(from.metadata),
            from.type
            &&
            new ItemType(
                from.type.id,
                from.type.name
            ),
            from.brand
            &&
            new Brand(
                from.brand.id,
                from.brand.name
            ),
            from.images,
            from.orders
        );
        return item;
    }
}