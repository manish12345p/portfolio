# Project Development Rules

From this point onward, treat the following as permanent development rules for this project.

## 1. Clean Architecture Is Mandatory
Every future change, feature, bug fix, refactor, integration, or new functionality MUST follow Clean Architecture.
Before implementing any change, first determine:
- Which architectural layer owns the responsibility.
- What belongs to the presentation layer.
- What belongs to the application layer.
- What belongs to the domain layer.
- What belongs to the infrastructure layer.
- Whether an abstraction/interface is required.
- Whether the change creates unnecessary coupling.
*Do not bypass the architecture for convenience.*

## 2. SOLID Principles Are Mandatory
All future code MUST follow SOLID principles:
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle
*Do not place unrelated responsibilities inside the same component, service, or module. Avoid giant components and tightly coupled code.*

## 3. No Quick Hacks
Never implement a feature by taking an architectural shortcut just because it is faster.
Do NOT:
- Put business logic directly inside UI components.
- Put API/database logic directly inside presentation components.
- Duplicate logic.
- Create unnecessary global state.
- Hardcode configuration or credentials.
- Create random abstractions without purpose.
- Introduce unnecessary dependencies.
- Leave temporary hacks as permanent code.
- Use the simplest solution that still respects the architecture.

## 4. Security Is Mandatory
Security must be considered for every future change.
Never:
- Hardcode API keys, passwords, or private credentials.
- Commit secrets.
- Expose server-side secrets to the browser.
- Put sensitive credentials inside `NEXT_PUBLIC_*` variables.
*Use environment variables whenever configuration or credentials are required. Maintain proper `.env.local`, `.env.example`, and `.gitignore` practices. Before every commit, verify that no secrets or sensitive configuration are being committed.*

## 5. Future Features
These rules apply to EVERYTHING added later, including:
New pages, sections, components, contact forms, APIs, authentication, database integration, third-party services, analytics, backend functionality, new animations, performance improvements, bug fixes, refactoring, and security improvements.
*Before implementing anything, analyze its architectural impact first.*

## 6. Existing Architecture Must Be Respected
Before modifying an existing file:
- Understand its responsibility and dependencies.
- Check whether the requested change belongs there.
- If it does not, create or modify the appropriate architectural layer instead.
- Avoid breaking existing abstractions.
- Do not restructure the project unnecessarily.
- If the current architecture needs improvement, improve it deliberately rather than introducing another workaround.

## 7. Quality Standard
Every change must aim for:
Clean code, strong TypeScript, maintainability, reusability, testability, security, performance, accessibility, and minimal unnecessary complexity.
*Avoid `any`, duplicated code, dead code, unused dependencies, magic values, and giant files wherever reasonably possible.*

## 8. Mandatory Workflow
For every future task, follow this workflow:
**Understand → Analyze Architecture → Plan → Implement → Validate → Review → Commit → Push**
*Do not jump directly from request to implementation.*

## 9. GitHub
After completing and validating a change:
**Repository:** [https://github.com/manish12345p/portfolio.git](https://github.com/manish12345p/portfolio.git)
Before pushing:
- Review `git diff`.
- Check `git status`.
- Verify no secrets are included.
- Verify the project builds successfully.
- Create a meaningful commit message.
- Push the changes to the repository.
*Never claim that a commit or push succeeded unless it was actually verified.*

## 10. Final Rule
Clean Architecture + SOLID + Security are permanent rules for this project, not optional guidelines.
Every future piece of code must follow them while avoiding unnecessary over-engineering.
