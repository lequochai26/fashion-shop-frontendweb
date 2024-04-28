import Item from "./Item";

export default interface OrderItem {
    item: Item;
    amount: number;
    price: number;
    metadata?: any;
}