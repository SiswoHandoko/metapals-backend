import { Species } from "../models/species.model";

export interface TransformedData {
    page: string;
    perPage: string;
    meta: string;
    total: number;
    data: {
        id: number;
        familyNameId: number;
        nativeHabitatId: number;
        name: string;
        commonName: string;
        tag: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}

export interface ParamFilter {
    page: number,
    perPage: number,
    field: string,
    value: string,
}