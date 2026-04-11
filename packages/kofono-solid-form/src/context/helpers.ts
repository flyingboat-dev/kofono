import { useContext } from "solid-js";
import { FormContext } from "@/context/FormContext";

// export function createFormContext() {
//     return createContext<FormState>({} as FormState);
// }

export function useFormContext(context = FormContext) {
    const [store, _setStore, methods] = useContext(context);
    return { store, ...methods } as const;
}
