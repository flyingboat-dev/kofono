export type GridSchemaOption = GridValueType | GridOption;

export type GridValueType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const MAX_GRID_VALUE = 12 as const;

type GridOption = {
    default?: GridValueType;
    sm?: GridValueType;
    md?: GridValueType;
    lg?: GridValueType;
    xl?: GridValueType;
    xxl?: GridValueType;
};
