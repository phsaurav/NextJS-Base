# Setup Instructions

## Table of Contents

1. [Project Setup](#project-setup)
1. [Engine Locking](#engine-locking)
1. [Code Formatting and Quality Tools](#code-formatting-and-quality-tools)
1. [Git Hooks](#git-hooks)
1. [Commit Rules](#commit-rules)
1. [VS Code Configuration](#vs-code-configuration)
1. [Debugging](#debugging)
1. [Directory Structure](#directory-structure)
1. [Tailwind Config](#tailwind-config)

## Project Setup

Check latest NextJS project setup instructions from NextJS website

[NextJS Doc](https://nextjs.org/learn/basics/create-nextjs-app/setup)

This projects configuration:

```bash
npx create-next-app --ts .

Ok to proceed? (y) y
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
```

Check if everything is working properly. We are using `yarn` as package manager.

```
yarn install
yarn dev
yarn build
```

## Engine Locking

We would like for all developers working on this project to use the same Node engine and package manager we are using.
Add engines configuration in package.json:

`package.json`

```json
  "engines": {
    "node": ">=20.8.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  },
  ...
```

## Code Formatting and Quality Tools

### ESLint

If we choose ESLint in nextjs project configuration we should have eslint already installed.

`.eslintrc.json`

```json
{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "globals": {
    "React": "readonly"
  },
  "rules": {
    // "no-unused-vars": [
    //   1,
    //   {
    //     "args": "after-used",
    //     "argsIgnorePattern": "^_"
    //   }
    // ]
  }
}
```

### Prettier

Installing prettier:

```
yarn add -D prettier
```

Add prettier ignore file:

`.prettierignore`

```
.yarn
.next
dist
node_modules
```

Add prettier config file:

`.prettierrc`

```.prettierrc
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Now we add a new script to `package.json` so we can run Prettier:

`package.json`

```
  ...
  "scripts: {
    ...
    "prettier": "prettier --write ."
  }
```

## Git Hooks

Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc. We would like to be able to set certain conditions, and only allow things like commit and push to succeed if our code meets those conditions, presuming that it indicates our project is of acceptable quality.

To install Husky run

```
yarn add -D husky

npx husky install
```

Add the following script to your `package.json` file:

`package.json`

```
  ...
  "scripts: {
    ...
    "prepare": "husky install"
  }
```

This will ensure Husky gets installed automatically when other developers run the project.
A hook to lint before committing:

```
npx husky add .husky/pre-commit "yarn lint"
```

A hook to build before pushing:

```
npx husky add .husky/pre-push "yarn build"
```

## Commit Rules

```
yarn add -D @commitlint/config-conventional @commitlint/cli
```

`commitlint.config.js`

```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

Then enable commitlint with Husky by using:

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## VS Code Configuration

`.vscode/settings.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  }
}
```

## Debugging

Inside of your `.vscode` directory create a `launch.json` file:

`launch.json`

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "yarn dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "yarn dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ],
  "resolveSourceMapLocations": ["${workspaceFolder}/**", "!**/node_modules/**"]
}
```

```
yarn add -D cross-env
```

With that package installed we can update our `package.json` `dev` script to look like the following:

`package.json`

```json
{
  ...
  "scripts": {
    ...
     "dev": "cross-env NODE_ENV=development NODE_OPTIONS='--inspect' next dev",
  },
}
```

## Directory Structure
	src
	├ app                           # Application 1 (user)
	│  ├── __init__.py
	│  ├── api                       # Holds all apis
	│  │  └── v1                     # API Version 1
	│  │    ├── __init__.py
	│  │    ├── service.py          # Holds all business logic
	│  │    └── app1.py             # Holds the api routes
	│  ├── schemas.py                # pydantic models
	│  ├── models.py                 # db models
	│  ├── config.py                 # local configs
	│  ├── constants.py
	│  └── utils.py
	├ components                            # Application 2 (blog)
	│  ├── __init__.py
	│  ├── api                       # Holds all apis
	│  │  └── v1                     # API Version 1
	│  │    ├── __init__.py
	│  │    ├── service.py          # Holds all business logic
	│  │    └── app2.py             # Holds the api routes
	│  ├── schemas.py                # pydantic models
	│  ├── models.py                 # db models
	│  ├── config.py                 # local configs
	│  ├── constants.py
	│  └── utils.py
	├ lib                   # Holds all global files
	│  ├──  __init__.py
	│  ├── models.py          # Global db models
	│  ├── config.py          # Global configs
	│  ├── database.py        # db connection related stuff
	│  ├── pagination.py      # global module pagination
	│  ├── constants.py       # Global constants
	│  └── utils.py
	├ styles                   # Holds all the test files
	│  ├── app1
	│  ├── app2
	│  └── core
	├ theme                   # Holds all the test files
	│  ├── app1
	│  ├── app2
	│  └── core
	├ utils                   # Holds all the test files
	│  ├── app1
	│  ├── app2
	│  └── core
	├── .eslint.json                  # Holds all environment variables
	├── .gitignore
	├── .prettierignore
	├── .prettierrc
	├── commitlint.config.js
	├── next.config.js
	├── package.json
	└── yarn.lock
	└── tailwind.config.js
	└── tsconfig.json

## Tailwind Config
`tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ** This is used to create custom theme
      letterSpacing: {
        wide: '.01em',
        wider: '.05em',
        widest: '.5em',
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '7rem',
        '9xl': '9rem',
        '10xl': '12rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        sm: '500px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        xxl: '1600px',
        fhd: '1920px',
      },
      colors: {
        brand: {
          main: {
            400: '#3579F6',
          },
          secondary: {
            400: '#4D39E5',
          },
          dark: '#36404F',
          bg: '#F6F9FC',
          accent: '#F3AF3D',
          error: '#EB4A4E',
          good: '#54B983',
        },
      },
    },
  },
  plugins: [],
};

```