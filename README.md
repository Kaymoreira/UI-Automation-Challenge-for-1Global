# Better Roaming - UI Automation Challenge

## Overview
This project contains the solution for the UI Automation Challenge for the QA Automation Engineer position at 1GLOBAL.

## Technology Stack
- **Framework**: Cypress (v15.10.0)
- **Language**: JavaScript
- **Node Version**: v20.11.1

## Project Structure
```
better-roaming-cypress-test/
├── cypress/
│   ├── e2e/
│   │   └── better-roaming.cy.js           # Test implementation (CEPEDI pattern)
│   ├── support/
│   │   └── commands.js                    # Custom Cypress commands
│   └── results/                           # Test reports (generated)
├── cypress.config.js                       # Cypress configuration
├── package.json                           # Dependencies and scripts
└── README.md                              # This file
```

## Test Requirements
The automation test performs the following actions:
1. Opens https://www.betterroaming.com/
2. Selects Euro as currency
3. Clicks on Thailand
4. Validates the third plan has:
   - Country: Thailand
   - Data: 5GB
   - Valid: 30 days
   - Plan type: data only
   - Price: 11,79 € (or current price if different)

## Key Features
- **CEPEDI Pattern**: Following the established pattern from CEPEDI project
- **Custom Commands**: Reusable commands for cookie handling, currency selection, country selection, and plan validation
- **XPath Selectors**: Robust XPath-based element location
- **Dynamic Pricing**: Handles price updates gracefully
- **Error Handling**: Comprehensive error handling with uncaught exception handling
- **Explicit Waits**: Strategic waits for element loading and stabilization

## Installation
```bash
npm install
```

## Running Tests

### Interactive Mode
```bash
npm run test:open
```

### Headless Mode (Chrome)
```bash
npm run test:chrome
```

### Headed Mode
```bash
npm run test:headed
```

### All Tests
```bash
npm test
```

## Test Reports
After running tests, reports are generated in the `cypress/results/` directory with detailed information about test execution, including screenshots on failures.

## Custom Commands
- `cy.aceitarCookies()`: Handles cookie popup acceptance (iframe and direct approaches)
- `cy.selecionarMoeda(moeda)`: Selects currency from dropdown
- `cy.selecionarPais(pais)`: Clicks on specified country
- `cy.validarPlano(indicePlano, detalhesEsperados)`: Validates plan details
- `cy.aguardarPlanosCarregarem()`: Waits for plans to load

## Configuration
The Cypress configuration includes:
- Base URL: https://www.betterroaming.com/
- Viewport: 1920x1080
- Timeout: 10 seconds
- Chrome web security disabled
- Screenshots on failure
- Support file enabled

## Test Cases
1. **Main Requirement Test**: Validates Thailand plan details according to challenge requirements
2. **Plan Structure Test**: Validates plan count and visibility
3. **Field Validation Test**: Validates all required fields are present
4. **Dynamic Pricing Test**: Handles price updates gracefully

## Notes
- **CEPEDI Pattern**: Code follows the established CEPEDI project patterns for consistency
- **XPath Approach**: Uses XPath selectors for robustness across different frameworks
- **Error Resilience**: Uncaught exceptions are handled gracefully
- **Explicit Waits**: Strategic waits ensure proper element loading
- **Modular Design**: Commands are reusable and maintainable
