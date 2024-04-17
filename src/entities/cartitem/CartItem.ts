import Item from "./Item";

export default interface CartItem {
    item?: Item | undefined;
    amount: number;
    metadata: any
}