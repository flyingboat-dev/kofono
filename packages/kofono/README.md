# Kofono

[![npm version](https://img.shields.io/npm/v/@flyingboat/kofono.svg)](https://www.npmjs.com/package/@flyingboat/kofono)
[![License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](LICENSE)

A powerful headless form engine library. Kofono provides
a robust system for building, validating, and managing complex forms with
conditional logic.

It can be run in any JavaScript environment, including Node.js and browsers, and
is designed to work seamlessly with modern frameworks like React, Vue, SolidJS and more.

```typescript
import { K, } from "@flyingboat/kofono";

const form = await K.form({
    name: K.string(notEmpty()),
    age: K.number(between(1, 120, "Age must be between 1 and 120")),
    email: K.string(email()),
    address: K.object({
        street: K.string([
            notEmpty(),
            min(1, "Street must be at least 1 char"),
        ]),
        city: K.string(notEmpty()),
        zipCode: K.string(notEmpty()),
    }),
    sameAddress: K.boolean().default(false),
    billingAddress: K.object({
        street: K.string(notEmpty()),
        city: K.string(notEmpty()),
        zipCode: K.string(notEmpty()),
    }).qualifications(condition(["{data:sameAddress}", "==", false])),
});
```
