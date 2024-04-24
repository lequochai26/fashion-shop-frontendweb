import Controller from "./Controller";
import { LoadLoggedInUserParam } from "./LoadLoggedInUserController";

export default class ValidateManagerController implements Controller<ValidateManagerParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onFailed, onSuccess, loadLoggedInUserController}: ValidateManagerParam): Promise<void> {
        await loadLoggedInUserController.execute({
            onSuccess(user) {
                if (user.permission === 'MANAGER') {
                    onSuccess(true);
                }
            },
            onFailed,
            onError
        })
    }
}

export interface ValidateManagerParam {
    loadLoggedInUserController: Controller<LoadLoggedInUserParam>,
    onSuccess(access: boolean): void;
    onFailed(code: string, message: string): void;
    onError(error: any): void;
}