export default interface CartItemInfo {
    item: Item;
    amount: number;
    metadata: any
}

export interface Item {
    id: string,
    name: string,
    avatar: string,
    price: number,
    metadata?: any
}