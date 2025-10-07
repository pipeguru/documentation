---
title: React Native Installation Guide
tags: [react-native, installation]
---

## Getting Started with PipeGuru for React Native

This guide will walk you through the steps to integrate PipeGuru into your React Native application.

### 1. Install the Package

Install the PipeGuru package using npm or yarn.

#### For React Native >= 0.60 (autolinking enabled)

```bash
npm install @pipeguru/react-native
# or
yarn add @pipeguru/react-native
```

#### For React Native < 0.60 (manual linking required)

If you are using an older version of React Native, you might need to link the native modules.

```bash
npx react-native link @pipeguru/react-native
```

### 2. Initialize PipeGuru

In your main `App.js` or `index.js` file, import and initialize PipeGuru.

```javascript
import PipeGuru from '@pipeguru/react-native';
import React from 'react';
import { View } from 'react-native';

// Initialize PipeGuru with your API key
PipeGuru.initialize("YOUR_API_KEY");

// Your App component
const App = () => {
  return (
    <View>
      {/* ... */}
    </View>
  );
};

export default App;
```

That's it! You're now ready to use PipeGuru in your React Native project.
