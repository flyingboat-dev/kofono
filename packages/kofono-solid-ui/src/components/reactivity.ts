import type { Form } from "@flyingboat/kofono";
import type { PropertiesSignals } from "@/components/types";

export function ripplesEffect(
    form: Form,
    propsSignals: PropertiesSignals,
    ripples: Set<string>,
): number {
    let count = 0;
    for (const selector of ripples) {
        if (propsSignals[selector]) {
            propsSignals[selector][1](form.prop(selector));
            count++;
        }
    }

    return count;
}

export async function updateHandler(
    form: Form,
    propsSignals: PropertiesSignals,
    selector: string,
    value: any,
): Promise<number> {
    await form.update(selector, value);
    propsSignals[selector]![1](form.prop(selector));
    const ripples = new Set<string>([
        ...form.events.getReverseSelectorsDependencies(selector),
        ...form.events.getSelectorsDependencies(selector),
    ]);

    return ripplesEffect(form, propsSignals, ripples);
}
