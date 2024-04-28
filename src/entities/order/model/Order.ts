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
    private _id?: string | undefined;
    private _type?: string | undefined;
    private _date?: Date | undefined;
    private _totalPrice?: number | undefined;
    private _createdBy?: User | undefined;
    private _orderedBy?: User | undefined;
    private _items: OrderItem[];
    private _status?: string | undefined;
    private _paymentMethod?: string | undefined;

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

    // Getters / setters:
    public get paymentMethod(): string | undefined {
        return this._paymentMethod;
    }
    public set paymentMethod(value: string | undefined) {
        this._paymentMethod = value;
    }

    public get status(): string | undefined {
        return this._status;
    }
    public set status(value: string | undefined) {
        this._status = value;
    }

    public get items(): OrderItem[] {
        return this._items;
    }
    public set items(value: OrderItem[]) {
        this._items = value;
    }

    public get orderedBy(): User | undefined {
        return this._orderedBy;
    }
    public set orderedBy(value: User | undefined) {
        this._orderedBy = value;
    }

    public get createdBy(): User | undefined {
        return this._createdBy;
    }
    public set createdBy(value: User | undefined) {
        this._createdBy = value;
    }

    public get totalPrice(): number | // Fields:
        undefined {
        return this._totalPrice;
    }
    public set totalPrice(value: number | // Fields:
        undefined) {
        this._totalPrice = value;
    }

    public get date(): Date | undefined {
        return this._date;
    }
    public set date(value: Date | undefined) {
        this._date = value;
    }

    public get type(): string | undefined // Fields:
    {
        return this._type;
    }
    public set type(value: string | undefined // Fields:
    ) {
        this._type = value;
    }

    public get id(): string | undefined // Fields:
    {
        return this._id;
    }
    public set id(value: string | undefined // Fields:
    ) {
        this._id = value;
    }
}