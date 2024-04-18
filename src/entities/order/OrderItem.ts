export default interface OrderItem {
    id: string;
    name: string;
    amount: number;
    price: number;
    metadata?: any;
    avatar: string;
}