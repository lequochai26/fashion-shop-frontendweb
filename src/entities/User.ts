export default interface User {
    email: string;
    fullName: string;
    gender: boolean;
    phoneNumber: string;
    address: string;
    avatar: string;
    permission: string;
    orderedOrders: string[];
    createdOrders: string[];
    wallet?: string | undefined;
}