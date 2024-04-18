import OrderInfo from "../entities/order/Order";
import Controller from "./Controller";

export default class CanCelOrderContrroller implements Controller<>{

}

export interface CanCelOrderParam{
    order : OrderInfo;
    on
}