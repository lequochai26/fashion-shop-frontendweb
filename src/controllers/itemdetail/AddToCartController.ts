import Item from "../../entities/Item/Item";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class AddToCartController implements Controller<AddToCartParam>{
    public constructor(){}

    public async execute({ item, metadata, onSuccess, onError }: AddToCartParam): Promise<void> {
        await apiFetch(
            {
                path: "/cart",
                method: "POST",
                body: {
                    id:item.id,
                    amount:1,
                    metadata: metadata
                },
                onSuccess: async function(response: Response) {
                    const body: RestResponse<undefined> = await response.json();

                    if (body.success) {
                        onSuccess();
                    }
                    else {
                        alert(`Code: ${body.code}, message: ${body.message}`);
                    }
                },
                onFailed: async function (error: any) {
                    onError(error);
                }
            }
        );
    }

}

export interface AddToCartParam {
    item: Item;
    metadata: {};
    onSuccess(): void;
    onError(error: any): void;
}