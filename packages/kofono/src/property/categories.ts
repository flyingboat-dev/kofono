import { PropertyType } from "./types";

export const allPropertyTypes: PropertyType[] = [
    PropertyType.Array,
    PropertyType.Boolean,
    PropertyType.Object,
    PropertyType.ListBoolean,
    PropertyType.ListMixed,
    PropertyType.ListNumber,
    PropertyType.ListString,
    PropertyType.Null,
    PropertyType.Number,
    PropertyType.String,
];

export const answerablePropertyTypes: PropertyType[] = [
    PropertyType.Boolean,
    PropertyType.Number,
    PropertyType.String,
    PropertyType.ListBoolean,
    PropertyType.ListMixed,
    PropertyType.ListNumber,
    PropertyType.ListString,
];

export const nonAnswerablePropertyTypes: PropertyType[] = [
    PropertyType.Array,
    PropertyType.Object,
    PropertyType.Null,
];

export const arrayPropertyTypes: PropertyType[] = [
    PropertyType.Array,
    PropertyType.ListBoolean,
    PropertyType.ListMixed,
    PropertyType.ListNumber,
    PropertyType.ListString,
];
