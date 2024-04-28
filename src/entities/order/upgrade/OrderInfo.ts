export default interface OrderInfo {
    id: string;
    type: string;
    date: string;
    totalPrice: number;
    createdBy?: OrderInfoUser;
    orderedBy?: OrderInfoUser;
    items: OrderInfoItem[];
    status: string;
    paymentMethod: string;
}

export interface OrderInfoItem {
    item: OrderInfoItemItem;
    amount: number;
    price: number;
    metadata?: any;
}

export interface OrderInfoItemItem {
    id: string;
    name: string;
    avatar: string;
    metadata?: any;
    price: number;
}

export interface OrderInfoUser {
    email: string;
    fullName: string;
}