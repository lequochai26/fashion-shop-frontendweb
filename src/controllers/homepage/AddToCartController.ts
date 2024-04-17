import Item from "../../entities/Item/Item";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import { redirect } from "../../utils/Redirector";
import Controller from "../Controller";

export default class AddToCartController implements Controller<AddToCartParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ item, onSuccess, onError }: AddToCartParam): Promise<void> {
        // No metadata case
        if (!item.metadata) {
            await apiFetch(
                {
                    path: "/cart",
                    method: "POST",
                    body: {
                        id: item.id,
                        amount: 1
                    },
                    onSuccess: async function (response: Response) {
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
                    },
                }
            );
        }
        else {
            redirect(`/itemdetail?id=${item.id}`);
        }
    }
}

export interface AddToCartParam {
    item: Item;
    onSuccess(): void;
    onError(error: any): void;
}