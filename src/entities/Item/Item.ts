import ItemBrand from "./ItemBrand";
import ItemType from "./ItemType";

export default interface Item {
    id: string;
    avatar: string;
    name: string;
    description: string;
    price: number;
    buyPrice: number;
    amount: number;
    gender: boolean;
    metadata?: any | undefined;
    type?: ItemType | undefined;
    brand?: ItemBrand | undefined;
    images: string[];
    orders: string[];
}