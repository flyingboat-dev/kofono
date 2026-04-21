import type { Properties } from "../types";
import { Events, type SelectorsEventsValidators } from "./types";

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
