# Playwright POM Framework (TypeScript)

Playwright Test + Page Object Model, targeting a local OrangeHRM 5.9 (http://localhost/orangehrm-5.9/).

## Setup
```bash
npm install
npx playwright install chromium
cp .env.example .env
```

## Run
```bash
npm test                # all tests
npm run test:headed     # visible browser
npm run test:ui         # UI mode
npm run test:smoke      # @smoke tests only
npm run report          # open HTML report
```

## Structure
- `pages/` page objects (extend `BasePage`)
- `fixtures/` custom fixtures that inject page objects into tests
- `tests/` specs; `auth.setup.ts` logs in once and saves `.auth/user.json`
- `test-data/` JSON data for data-driven tests
- `utils/` helpers
- `playwright.config.ts` projects: `setup`, `chromium` (authenticated), `chromium-auth` (login tests)
