import Controller from "./Controller";
import { LoadLoggedInUserParam } from "./LoadLoggedInUserController";

export default class CheckLoggedInController implements Controller<CheckLoggedInParam> {
    // Constructors:
    public constructor() {

    }

    // Methods:
    public async execute({ onError, onSuccess, loadLoggedInUserController }: CheckLoggedInParam): Promise<void> {
        await loadLoggedInUserController.execute(
            {
                onSuccess(user) {
                    onSuccess(true);
                },
                onError,
                onFailed(code, message) {
                    onSuccess(false);
                },
            }
        );
    }
}

export interface CheckLoggedInParam {
    loadLoggedInUserController: Controller<LoadLoggedInUserParam>;
    onSuccess(loggedIn: boolean): void;
    onError(error: any): void;
}