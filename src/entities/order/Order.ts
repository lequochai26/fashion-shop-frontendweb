import OrderItem from "./OrderItem";
import User from "./User";

export default interface OrderInfo {
    id: string;
    type: string;
    date: Date;
    totalPrice: number;
    createdBy?: User;
    orderedBy?: User;
    items: OrderItem[];
    status: string;
    paymentMethod: string;
}