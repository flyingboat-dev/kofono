# Kofono

[![npm version](https://img.shields.io/npm/v/@flyingboat/form.svg)](https://www.npmjs.com/package/@flyingboat/form)
[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)

A powerful headless form engine library framework-agnostic. Form provides
a robust system for building, validating, and managing complex forms with
conditional logic.

It can be run in any JavaScript environment, including Node.js and browsers, and
is designed to work seamlessly with modern frameworks like React, Vue, SolidJS and more.

### Basic Form Creation

```typescript
import { K } from "@flyingboat/kofono";

const form = await K.form({
    name: K.string().$v((x) => x.notEmpty()),
    age: K.number().$v((x) =>
        x.between(1, 120).expect("Age must be between 1 and 120"),
    ),
    email: K.string().$v((x) => x.email()),
    address: K.object({
        street: K.string().$v((x) => x.notEmpty()),
        city: K.string().$v((x) => x.notEmpty()),
        zipCode: K.string().$v((x) => x.notEmpty()),
    }),
    sameAsAddress: K.boolean().default(false),
    billingAddress: K.object({
        street: K.string().$v((x) => x.notEmpty()),
        city: K.string().$v((x) => x.notEmpty()),
        zipCode: K.string().$v((x) => x.notEmpty()),
    }).$q((q) => q.condition("{data:sameAsAddress}", "==", false)),
});

expect(form.isQualified("billingAddress")).toBeTruthy();

await form.update("sameAsAddress", true);

expect(form.isQualified("billingAddress")).toBeFalsy();
```

### Working with Validation

```typescript
import { S } from "@flyingboat/kofono";

// Create a form with various validation rules
const form = await S.form({
    username: S.string().$v((x) =>
        x
            .notEmpty()
            .minLength(3)
            .maxLength(20)
            .expect("Username must be between 3 and 20 characters"),
    ),
    password: S.string().$v((x) =>
        x
            .notEmpty()
            .minLength(8)
            .expect("Password must be at least 8 characters long"),
    ),
    confirmPassword: S.string().$v((x) =>
        x.notEmpty().equals("password").expect("Passwords must match"),
    ),
});

// Update fields
await form.update("username", "user");
await form.update("password", "securepassword");
await form.update("confirmPassword", "securepassword");

// Check validation results
console.log(form.$v("username")); // [true, ""]
console.log(form.$v("password")); // [true, ""]
console.log(form.$v("confirmPassword")); // [true, ""]

// Check overall form validity
console.log(form.state.stats.valid === form.state.stats.qualified); // true if all fields are valid
```

### Conditional Fields

```typescript
import { S } from "@flyingboat/kofono";

// Create a form with conditional fields
const form = await S.form({
    hasAddress: S.boolean(),
    address: S.object({
        street: S.string().$v((x) => x.notEmpty()),
        city: S.string().$v((x) => x.notEmpty()),
        zipCode: S.string().$v((x) => x.notEmpty()),
    }).$q((q) => q.equals("hasAddress", true)),
});

// Initially, address fields are not qualified (not shown)
console.log(form.$q("address")); // [false, "SELECTOR_TARGET_NOT_VALID"]

// Enable address fields
await form.update("hasAddress", true);

// Now address fields are qualified (should be shown)
console.log(form.$q("address")); // [true, ""]

// Update address fields
await form.update("address.street", "123 Main St");
await form.update("address.city", "Anytown");
await form.update("address.zipCode", "12345");

// Check form data
const data = form.data();
console.log(data); // { hasAddress: true, address: { street: "123 Main St", city: "Anytown", zipCode: "12345" } }
```

### JSON Schema ExamplePage

```typescript
import { buildSchema } from "@flyingboat/kofono";

const form = await buildSchema({
    __: {
        name: {
            type: "string",
            $v: ["notEmpty"],
        },
        age: {
            type: "number",
            $v: [
                {
                    between: {
                        min: 1,
                        max: 120,
                        error: "Age must be between 1 and 120",
                    },
                },
            ],
        },
        contactInfo: {
            type: "object",
            __: {
                email: {
                    type: "string",
                    $v: ["email"],
                },
                phone: {
                    type: "string",
                    $v: ["notEmpty"],
                },
            },
        },
    },
});

// Update field values
await form.update("name", "Jane Smith");
await form.update("age", 30);

// Check field validity
console.log(form.$v("name")); // [true, ""]
```

## API Reference

### Core Classes

### Key Methods

### Validators

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Proprietary License - see the LICENSE file
for details.

## Credits

Developed by Francois Lajoie and the Flyingboat team.
