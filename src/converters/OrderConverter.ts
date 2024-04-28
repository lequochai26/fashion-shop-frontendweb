import Metadata from "../entities/Item/Metadata";
import Item from "../entities/order/model/Item";
import Order from "../entities/order/model/Order";
import OrderItem from "../entities/order/model/OrderItem";
import User from "../entities/order/model/User";
import OrderInfo from "../entities/order/upgrade/OrderInfo";
import Converter from "../utils/Converter";

export default class OrderConverter implements Converter<OrderInfo, Order> {
    // Static fields:
    private static instance: OrderConverter = new OrderConverter();

    // Static methods:
    public static getInstance(): OrderConverter {
        return OrderConverter.instance;
    }
    
    // Constructors:
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor() {
        
    }

    // Methods:
    public convert(from: OrderInfo): Order {
        const order: Order = new Order();
        order.id = from.id;
        order.type = from.type;
        order.date = new Date(from.date);
        order.totalPrice = from.totalPrice;
        order.createdBy = (
            from.createdBy
            &&
            new User(from.createdBy.email, from.createdBy.fullName)
        );
        order.orderedBy = (
            from.orderedBy
            &&
            new User(from.orderedBy.email, from.orderedBy.fullName)
        );
        order.items = from.items.map(
            item => new OrderItem(
                new Item(
                    item.item.id,
                    item.item.name,
                    new Metadata(item.item.metadata),
                    item.item.avatar
                ),
                item.amount,
                item.price,
                item.metadata
            )
        );
        order.status = from.status;
        order.paymentMethod = from.paymentMethod;

        return order;
    }
}