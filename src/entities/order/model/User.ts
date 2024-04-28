export default class User {
    // Fields:
    private _email?: string | undefined;
    private _fullName?: string | undefined;

    // Constructors:
    public constructor(email?: string | undefined, fullName?: string | undefined) {
        this._email = email;
        this._fullName = fullName;
    }

    // Getters / setters:
    public get fullName(): string | undefined {
        return this._fullName;
    }
    public set fullName(value: string | undefined) {
        this._fullName = value;
    }

    public get email(): string | undefined {
        return this._email;
    }
    public set email(value: string | undefined) {
        this._email = value;
    }
}