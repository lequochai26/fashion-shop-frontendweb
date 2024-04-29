import MetadataHelper from "../utils/MetadataHelper";

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
        return this._metadata && MetadataHelper.toStringMetadata(this._metadata);
    }

    // Getters / setters:
    public get metadata(): any {
        return this._metadata;
    }
    public set metadata(value: any) {
        this._metadata = value;
    }
}