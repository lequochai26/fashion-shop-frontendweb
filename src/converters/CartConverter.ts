import Cart from "../entities/cartitem/model/Cart";
import CartItem from "../entities/cartitem/model/CartItem";
import CartItemInfo from "../entities/cartitem/upgrade/CartItemInfo";
import Metadata from "../entities/Item/Metadata";
import Item from "../entities/Item/model/Item";
import Converter from "../utils/Converter";

export default class CartConverter implements Converter<CartItemInfo[], Cart> {
    // Static fields:
    private static instance: CartConverter = new CartConverter();

    // Static methods:
    public static getInstance(): CartConverter {
        return CartConverter.instance;
    }

    // Constructors:
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    private constructor() {

    }

    // Methods:
    public convert(from: CartItemInfo[]): Cart {
        const cart: Cart = new Cart();
        cart.items = from.map(
            cartItem => {
                const item: CartItem = new CartItem();
                item.amount = cartItem.amount;
                item.metadata = cartItem.metadata;

                item.item = new Item();
                item.item.id = cartItem.item.id;
                item.item.name = cartItem.item.name;
                item.item.price = cartItem.item.price;
                item.item.avatar = cartItem.item.avatar;
                item.item.metadata = cartItem.item.metadata && new Metadata(cartItem.item.metadata);

                return item;
            }
        );

        return cart;
    }
}