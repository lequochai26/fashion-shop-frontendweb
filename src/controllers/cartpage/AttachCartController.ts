import CartItem from "../../entities/cartitem/CartItem";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class AttachCartController implements Controller<AttachCartParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ items, onSuccess, onFailed, onError }: AttachCartParam): Promise<void> {
        await apiFetch({
            path: "/cart?method=attach",
            method: "POST",
            body: {
                items
            },
            async onSuccess(response) {
                const { success, code, message }: RestResponse<undefined> = await response.json();

                if (success) {
                    onSuccess();
                }
                else {
                    onFailed(code as string, message as string);
                }
            },
            async onFailed(error) {
                onError(error);
            }
        });
    }
}

export interface AttachCartParam {
    items: AttachCartItem[];
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}

export interface AttachCartItem {
    id: string;
    metadata?: any | undefined;
}