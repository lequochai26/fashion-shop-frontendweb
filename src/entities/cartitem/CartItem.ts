import Item from "./Item";

export default interface CartItem {
    item: Item;
    amount: number;
    metadata: any
}