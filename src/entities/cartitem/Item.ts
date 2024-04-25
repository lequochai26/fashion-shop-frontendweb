import Metadata from "../Item/Metadata";

export default interface Item {
    id: string,
    name: string,
    avatar: string,
    price: number,
    metadata?: Metadata
}