# Welcome to AI Travel app 👋

[![React Native CI - Test, Report & SonarCloud](https://github.com/HCMUT-SHORT/frontend-master/actions/workflows/test.yml/badge.svg)](https://github.com/HCMUT-SHORT/frontend-master/actions/workflows/test.yml)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Testing Guide


This project uses **Jest** and **React Native Testing Library** to test both UI components and application logic.


### 1. Run all tests


```bash
npm run test
```


This command will:


- Execute all test files inside the `__tests__/` directory
- Display pass/fail results in the terminal
- Automatically watch file changes in development mode


### 2. Run tests with coverage report


```bash
npm run test:coverage
```


This command will:


- Generate a **coverage report**
- Export results to:


```
coverage/
└── index.html
```


You can open `coverage/index.html` in your browser to view a detailed coverage dashboard (statements, branches, functions, lines).

