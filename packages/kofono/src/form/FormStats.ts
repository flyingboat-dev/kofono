import { TreeType } from "../property/types";
import type { Form } from "./Form";
import type { Stats } from "./types";

export class FormStats {
    constructor(private form: Form) {}

    public compile(): Stats {
        const stats: Stats = {
            qualified: 0,
            valid: 0,
            invalid: 0,
            progression: 0,
            node: 0,
            leaf: 0,
        };
        for (const [sel, prop] of this.form.propsEntries()) {
            if (prop.treeType === TreeType.Leaf) {
                stats.leaf += 1;
                stats.qualified += Number(
                    this.form.state.qualifications[sel][0],
                ); // may cause a bug if the qualification is not a boolean
                stats.valid += Number(this.form.state.validations[sel][0]); // may cause a bug if validation is not a boolean
            } else if (prop.treeType === TreeType.Node) {
                stats.node += 1;
            }
        }
        stats.invalid = stats.qualified - stats.valid;
        stats.progression =
            stats.qualified > 0 ? (stats.valid / stats.qualified) * 100 : 0;
        this.form.state.stats = stats;
        return stats;
    }
}
