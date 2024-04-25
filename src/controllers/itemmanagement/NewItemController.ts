import Metadata from "../../entities/Item/Metadata";
import RestResponse from "../../interfaces/RestResponse";
import { apiFetch } from "../../utils/APIFetcher";
import Controller from "../Controller";

export default class NewItemController implements Controller<NewItemParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ form, onSuccess, onFailed, onError }: NewItemParam): Promise<void> {
        // Create form data
        const formData: FormData = new FormData();

        // Id
        if (!form.id) {
            onFailed("ID_REQUIRED", "id parameter is required!");
            return;
        }
        formData.set("id", form.id);

        // Name
        if (!form.name) {
            onFailed("NAME_REQUIRED", "name parameter is required!");
            return;
        }
        formData.set("name", form.name);

        // Gender
        if (form.gender === undefined) {
            onFailed("GENDER_REQUIRED", "gender parameter is required!");
            return;
        }
        formData.set("gender", `${form.gender}`);

        // Price
        if (form.price === undefined) {
            onFailed("PRICE_REQUIRED", "price parameter is required!");
            return;
        }
        formData.set("price", `${form.price}`);

        // BuyPrice
        if (!form.buyPrice === undefined) {
            onFailed("BUYPRICE_REQUIRED", "buyPrice parameter is required!");
            return;
        }
        formData.set("buyPrice", `${form.buyPrice}`);

        // Amount
        if (!form.amount === undefined) {
            onFailed("AMOUNT_REQUIRED", "amount parameter is required!");
            return;
        }
        formData.set("amount", `${form.amount}`);

        // Description
        if (!form.description) {
            onFailed("DESCRIPTION_REQUIRED", "description parameter is required!");
            return;
        }
        formData.set("description", form.description);

        // Metadata
        if (form.metadata) {
            const metadata: Metadata = form.metadata;
            formData.set(
                "metadata",
                JSON.stringify(metadata.toJSON())
            );
        }

        // Avatar
        if (!form.avatar) {
            onFailed("AVATAR_REQUIRED", "avatar parameter is required!");
            return;
        }
        formData.set("avatar", form.avatar);

        // Type
        if (form.type) {
            formData.set("type", form.type);
        }

        // Brand
        if (form.brand) {
            formData.set("brand", form.brand);
        }

        // Images
        if (form.images) {
            for (const image of form.images) {
                formData.append("images", image);
            }
        }

        // API fetching
        await apiFetch({
            method: "POST",
            path: "/item",
            body: formData,
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
            },
        });
    }
}

export interface NewItemParam {
    form: any,
    onSuccess(): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}