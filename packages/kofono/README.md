# Kofono

[![npm version](https://img.shields.io/npm/v/@flyingboat/kofono.svg)](https://www.npmjs.com/package/@flyingboat/kofono)
[![License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](LICENSE)

A powerful headless form engine library framework-agnostic. Form provides
a robust system for building, validating, and managing complex forms with
conditional logic.

It can be run in any JavaScript environment, including Node.js and browsers, and
is designed to work seamlessly with modern frameworks like React, Vue, SolidJS and more.

```typescript
import { K } from "@flyingboat/kofono";

const form = await K.form({
    name: K.string().validations((v) => 
        v.notEmpty().expect("Name cannot be empty")
            .max(30).expect("Name cannot be longer than 30 characters")
    ),
    age: K.number().validations((v) =>
        v.between(1, 120).expect("Age must be between 1 and 120"),
    ),
    email: K.string().validations((v) => v.email()),
    address: K.object({
        street: K.string().validations((v) => v.notEmpty()),
        city: K.string().validations((v) => v.notEmpty()),
        zipCode: K.string().validations((v) => v.notEmpty()),
    }),
    sameAsAddress: K.boolean().default(false),
    billingAddress: K.object({
        street: K.string().validations((v) => v.notEmpty()),
        city: K.string().validations((v) => v.notEmpty()),
        zipCode: K.string().validations((v) => v.notEmpty()),
    }).qualifications((q) => q.condition("{data:sameAsAddress}", "==", false)),
});
```
