import type { FormProperty, SchemaComponent } from "@flyingboat/kofono";
import type { Accessor } from "solid-js";
import { Checkbox, type CheckboxComponent } from "@/components/checkbox";
import { CheckboxGroup } from "@/components/checkboxGroup";
import { Code, Paragraph, Small, Span } from "@/components/displayElements";
import { FormDropdown } from "@/components/dropdown";
import {
    FileInput,
    type FileInputComponent,
} from "@/components/FileInput/FileInput";
import { FormInput, type InputComponent } from "@/components/input";
import { RadioGroup } from "@/components/radioGroup";
import {
    RangeInput,
    type RangeInputComponent,
} from "@/components/rangeInput/RangeInput";
import { Select } from "@/components/select";
import { FormTextarea } from "@/components/textarea";
import type { UpdateHandler } from "./types";

export interface PropElementProps {
    property: Accessor<FormProperty>;
    updateHandler: UpdateHandler;
}

export interface FormElementProps extends PropElementProps {}

export enum ComponentType {
    Checkbox = "checkbox2",
    CheckboxGroup = "checkbox-group",
    Code = "code",
    Dropdown = "dropdown",
    FileInput = "file-input",
    Input = "input",
    MaskedInput = "masked-input",
    Paragraph = "p",
    RadioGroup = "radio-group",
    RangeInput = "range-input",
    Select = "select",
    Small = "small",
    Span = "span",
    Textarea = "textarea",
}

export const C = {
    Checkbox: ComponentType.Checkbox,
    CheckboxGroup: ComponentType.CheckboxGroup,
    Code: ComponentType.Code,
    Dropdown: ComponentType.Dropdown,
    FileInput: ComponentType.FileInput,
    Input: ComponentType.Input,
    MaskedInput: ComponentType.MaskedInput,
    Paragraph: ComponentType.Paragraph,
    RangeInput: ComponentType.RangeInput,
    RadioGroup: ComponentType.RadioGroup,
    Select: ComponentType.Select,
    Small: ComponentType.Small,
    Span: ComponentType.Span,
    Textarea: ComponentType.Textarea,
} as const;

export type ComponentMap = {
    [ComponentType.Checkbox]: CheckboxComponent;
    [ComponentType.CheckboxGroup]: CheckboxComponent;
    [ComponentType.Code]: SchemaComponent;
    [ComponentType.Dropdown]: SchemaComponent;
    [ComponentType.FileInput]: FileInputComponent;
    [ComponentType.Input]: InputComponent;
    [ComponentType.MaskedInput]: SchemaComponent;
    [ComponentType.Paragraph]: SchemaComponent;
    [ComponentType.RadioGroup]: SchemaComponent;
    [ComponentType.RangeInput]: RangeInputComponent;
    [ComponentType.Select]: SchemaComponent;
    default: SchemaComponent;
};

export function PropElement(props: PropElementProps) {
    const componentType = props.property().get<string>("component.type", "");
    const elProps = {
        property: props.property,
        updateHandler: props.updateHandler,
    };
    const el = (() => {
        switch (componentType) {
            case C.Input:
                return <FormInput {...elProps} />;
            case C.FileInput:
                return <FileInput {...elProps} />;
            case C.Textarea:
                return <FormTextarea {...elProps} />;
            case C.Select:
                return <Select {...elProps} />;
            case C.Dropdown:
                return <FormDropdown {...elProps} />;
            case C.Checkbox:
                return <Checkbox {...elProps} />;
            case C.CheckboxGroup:
                return <CheckboxGroup {...elProps} />;
            case C.RadioGroup:
                return <RadioGroup {...elProps} />;
            case C.RangeInput:
                return <RangeInput {...elProps} />;
            case C.Span:
                return <Span {...elProps} />;
            case C.Small:
                return <Small {...elProps} />;
            case C.Paragraph:
                return <Paragraph {...elProps} />;
            case C.Code:
                return <Code {...elProps} />;
            default:
                return <FormInput {...elProps} />;
        }
    })();

    return <>{el}</>;
}
