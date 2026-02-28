# 0.7.0 - ?

- rework form session to use state meta
- add plugins to state meta
- add events FormLoadState
- add Form::isQualified()
- add Form::pass()
- refactor schema builder validators declaration
- add a base plugin and rework UpdateCounterPlugins
- add IsTrueValidator and IsFalseValidator
- rework validators factory
- prefix valid and notValid validators with is for consistency

# 0.6.0 - 2026-01-03

- rename project to Kofono
- rename S to K
- prevent prototype pollution in DataSelector
- add event PropertyAdded and PropertyDeleted
- add event ArrayPropertyExpanded and ArrayPropertySliced
- add condition modifier toUpperCase
- add test for PasswordValidator

# 0.5.0 - 2025-11-29

- add IfValidator
- add EmptyValidator
- remove ValueValidator
- add Condition parser and validator
- add RequiredValidator
- add FormProperty isRequired() && isOptional() methods
- add S builder extendsSchema()
- refactor validators errors under a object called ValidatorErrors
- support optional context for validator response

# 0.4.0 - 2025-07-01

- rework Form constructor and initialization
- rework events types
- rework validators
- rename validator isValid and isNotValid to valid and notValid
- add min/max, regexp, equal, notEqual, url, alpha, alphaNum validators
- drop biomejs and revert to prettier
- introduce plugins + refactor form building accordingly

# 0.3.0 - 2025-03-01

- rework FormProperty and introduce interface BaseProperty
- add fluent schema builder
- drop prettier and eslint for biomejs
- drop jest for vitest
- switch to pnpm

# 0.2.0 - 2024-05-25

- fix/rework types for Events callbacks and contexts
- add form component
- better property default data handling
- add updateId to event context and Form::updateId()
- switch to async for build and events
- drop duplicate type ValidationCtx
- modify Form.update() to also trigger dependencies validation event
- add token var replacement in ValueValidator
- add email validator

# 0.1.0 - 2023-10-05

- First prototype version
