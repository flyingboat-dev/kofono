import { PropertyType } from "../../property/types";
import type { Form } from "../Form";
import type { Properties } from "../types";
import { Events, type SelectorsEventsValidators } from "./types";

/**
 * Register qualifications/validations events for properties
 */
export async function registerPropertiesEvents(form: Form): Promise<void> {
    await form.events.registerSelectorsValidators(
        parseSelectorsEventsValidators(form.props),
    );
}

/**
 * Transform all properties validators into SelectorsEventsValidators
 */
export function parseSelectorsEventsValidators(
    props: Properties,
    _parent: string = "", // todo remove it eventually
): SelectorsEventsValidators {
    const propertiesEvents: SelectorsEventsValidators = {};
    for (const prop of Object.values(props)) {
        propertiesEvents[prop.selector] = {
            [Events.SelectorValidation]: [],
            [Events.SelectorQualification]: [],
        };

        propertiesEvents[prop.selector][Events.SelectorValidation] =
            prop.validationValidators;
        propertiesEvents[prop.selector][Events.SelectorQualification] =
            prop.qualificationValidators;
    }
    return propertiesEvents;
}

/**
 * Call all validations/qualifications events for properties
 */
export async function warmUpSelectorsEvents(form: Form): Promise<void> {
    for (const [selector, prop] of Object.entries(form.props)) {
        if (prop.type === PropertyType.Null) {
            continue;
        }
        await form.events.emitSelector(selector, Events.SelectorValidation, {
            form: form,
            selector,
            value: form.$d(selector),
        });
    }
    for (const [selector, prop] of Object.entries(form.props)) {
        if (prop.type === PropertyType.Null) {
            continue;
        }
        await form.events.emitSelector(selector, Events.SelectorQualification, {
            form: form,
            selector,
            value: form.$d(selector),
        });
    }
}
