import CurrencyHelper from "../utils/CurrencyHelper";
import { formatVNDate } from "../utils/DateHelper";
import OrderItem from "./OrderItem";
import User from "./User";

export default class Order {
    // Static methods:
    public static getStatusTitle(status: string): string {
        switch (status) {
            case 'APPROVEMENT_AWAITING': return "Đang chờ xác nhận";
            case 'DELIVERING': return "Đang giao";
            case 'SUCCESS': return "Đã hoàn tất";
            case 'PAYMENT_AWAITING': return "Đang chờ thanh toán";
            case 'CANCELLED': return "Đã hủy";
            default: return "Không rõ";
        }
    }

    // Fields:
    private _id: string;
    private _type: string;
    private _date: Date;
    private _totalPrice: number;
    private _createdBy: User;
    private _orderedBy: User;
    private _items: OrderItem[];
    private _status: string;
    private _paymentMethod: string;

    // Constructors:
    public constructor(
        id?: string | undefined,
        type?: string | undefined,
        date?: Date | undefined,
        totalPrice?: number | undefined,
        createdBy?: User | undefined,
        orderedBy?: User | undefined,
        items?: OrderItem[] | undefined,
        status?: string | undefined,
        paymentMethod?: string | undefined
    ) {
        this._id = id;
        this._type = type;
        this._date = date;
        this._totalPrice = totalPrice;
        this._createdBy = createdBy;
        this._orderedBy = orderedBy;
        this._items = items || [];
        this._status = status;
        this._paymentMethod = paymentMethod;
    }

    // Methods:
    public toStringDate(): string | undefined {
        if (this._date) {
            return formatVNDate(this._date);
        }
    }

    public getTotalPriceVND(): string {
        return CurrencyHelper.formatVND(this._totalPrice || -1);
    }

    // Getters / setters:
    public get paymentMethod(): string {
        return this._paymentMethod;
    }
    public set paymentMethod(value: string) {
        this._paymentMethod = value;
    }

    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }

    public get items(): OrderItem[] {
        return this._items;
    }
    public set items(value: OrderItem[]) {
        this._items = value;
    }

    public get orderedBy(): User {
        return this._orderedBy;
    }
    public set orderedBy(value: User) {
        this._orderedBy = value;
    }

    public get createdBy(): User {
        return this._createdBy;
    }
    public set createdBy(value: User) {
        this._createdBy = value;
    }

    public get totalPrice(): number {
        return this._totalPrice;
    }
    public set totalPrice(value: number) {
        this._totalPrice = value;
    }

    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }

    public get type(): string
    {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get id(): string
    {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
}