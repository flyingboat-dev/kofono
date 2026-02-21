import type { FormProperty, SchemaComponent } from "@flyingboat/kofono";
import type { Accessor } from "solid-js";
import { Checkbox, type CheckboxComponent } from "@/components/checkbox";
import { CheckboxGroup } from "@/components/checkboxGroup";
import { Code, Paragraph, Small, Span } from "@/components/displayElements";
import { FormDropdown } from "@/components/dropdown";
import { FormInput, type InputComponent } from "@/components/input";
import { RadioGroup } from "@/components/radioGroup";
import { FormSegment } from "@/components/segment";
import { Select } from "@/components/select";
import { Slider } from "@/components/slider";
import { FormTextarea } from "@/components/textarea";
import { FormUpload } from "@/components/upload";
import type { UpdateHandler } from "./types";

export interface PropElementProps {
    property: Accessor<FormProperty>;
    updateHandler: UpdateHandler;
}

export interface FormElementProps extends PropElementProps {}

export enum ComponentType {
    Checkbox = "checkbox2",
    CheckboxGroup = "checkboxGroup",
    Code = "code",
    Dropdown = "dropdown",
    Input = "input",
    MaskedInput = "masked-input",
    Paragraph = "p",
    RadioGroup = "radioGroup",
    Segment = "segment",
    Select = "select",
    Slider = "slider",
    Small = "small",
    Span = "span",
    Textarea = "textarea",
    Upload = "upload",
}

export const C = {
    Checkbox: ComponentType.Checkbox,
    CheckboxGroup: ComponentType.CheckboxGroup,
    Code: ComponentType.Code,
    Dropdown: ComponentType.Dropdown,
    Input: ComponentType.Input,
    MaskedInput: ComponentType.MaskedInput,
    Paragraph: ComponentType.Paragraph,
    RadioGroup: ComponentType.RadioGroup,
    Segment: ComponentType.Segment,
    Select: ComponentType.Select,
    Slider: ComponentType.Slider,
    Small: ComponentType.Small,
    Span: ComponentType.Span,
    Textarea: ComponentType.Textarea,
    Upload: ComponentType.Upload,
} as const;

export type ComponentMap = {
    [ComponentType.Checkbox]: CheckboxComponent;
    [ComponentType.CheckboxGroup]: CheckboxComponent;
    [ComponentType.Code]: SchemaComponent;
    [ComponentType.Dropdown]: SchemaComponent;
    [ComponentType.Input]: InputComponent;
    [ComponentType.MaskedInput]: SchemaComponent;
    [ComponentType.Paragraph]: SchemaComponent;
    [ComponentType.RadioGroup]: SchemaComponent;
    [ComponentType.Segment]: SchemaComponent;
    [ComponentType.Select]: SchemaComponent;
    [ComponentType.Slider]: SchemaComponent;
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
            case C.Span:
                return <Span {...elProps} />;
            case C.Small:
                return <Small {...elProps} />;
            case C.Paragraph:
                return <Paragraph {...elProps} />;
            case C.Code:
                return <Code {...elProps} />;
            case C.Segment:
                return <FormSegment {...elProps} />;
            case C.Slider:
                return <Slider {...elProps} />;
            case C.Upload:
                return <FormUpload {...elProps} />;
            default:
                return <FormInput {...elProps} />;
        }
    })();

    return <>{el}</>;
}
