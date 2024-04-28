export class MetadataHolder {
    // Fields:
    protected _metadata?: any;

    // Constructors:
    public constructor(
        metadata?: any
    ) {
        this._metadata = metadata;
    }

    // Methods:
    public toStringMetadata(): string | undefined {
        if (!this._metadata) {
            return undefined;
        }

        // Define string
        let str: string = "";

        // Converting
        for (const key of Object.keys(this._metadata)) {
            str += `${str !== '' ? ', ' : ''}${key}: ${this._metadata[key]}`;
        }

        // Return string
        return str;
    }

    // Getters / setters:
    public get metadata(): any {
        return this._metadata;
    }
    public set metadata(value: any) {
        this._metadata = value;
    }
}