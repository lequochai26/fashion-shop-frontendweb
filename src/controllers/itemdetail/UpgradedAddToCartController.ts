import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class UpgradedAddToCartController implements Controller<UpgradedAddToCartParam> {
    //Constructors:
    public constructor() {}

    //Methods:
    public async execute({id, metadata, onSuccess, onError}: UpgradedAddToCartParam): Promise<void> {
        //fetch API
        await apiFetch(
            {
                path: "/cart?method=add",
                method: "POST", 
                body: {
                    id: id,
                    amount : 1,
                    metadata : metadata
                },
                onSuccess: async function (response: Response) {
                    const { success, code, message } = await response.json();

                    if(success) {
                        onSuccess();
                    } else {
                        alert(`Code: ${code} - Message: ${message}`);
                    }
                },
                onFailed: async function(error: any) {
                    onError(error);
                },
            }
        )
    }
}

export interface UpgradedAddToCartParam {
    id: string;
    metadata: any;
    onSuccess(): void;
    onError(error: any): void;
}