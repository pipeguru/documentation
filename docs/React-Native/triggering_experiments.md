---
title: Triggering Experiments in React Native
tags: [react-native, experiments]
sidebar_position: 2
---

## Triggering Experiments

The PipeGuru React Native SDK offers a flexible, hook-based approach to instrumenting your app for experiments. By adding a single hook to your screens, you can empower your marketing and product teams to remotely configure and launch multiple types of placements—popups, inline banners, and button-driven flows—without needing new app releases.

The core of this system is the `usePipeguruTriggers` hook. You provide it with a unique `screenId` for the screen you're instrumenting, and it returns components that will automatically render placements configured for that `screenId` in the PipeGuru dashboard.

### The `usePipeguruTriggers` Hook

First, import the hook and call it in your component. You must provide a unique `screenId` and can optionally pass an `attributes` object for server-side targeting.

These attributes allow your non-technical teams to create powerful segments from the PipeGuru dashboard, like showing an experiment only to "female users in Berlin" or "users on a premium plan".

```typescript
import { usePipeguruTriggers } from '@pipeguru/react-native';

const HomeScreen = () => {
  // Example attributes for segmentation.
  // 'braze_segments' is shown here as an example of passing custom data structures.
  const brazeSegments = ['segment1', 'segment2'];

  const { OverlayPlacement, InlinePlacement, TriggerButton } = usePipeguruTriggers(
    'home',
    {
      attributes: {
        plan: 'premium',
        user_level: 'power_user',
        gender: 'female',
        city: 'Berlin',
        country: 'Germany',
        braze_segments: brazeSegments,
      },
    }
  );

  // ... render the components
};
```

The hook returns three components, each corresponding to a different type of placement.

### 1. Displaying Overlays (Popups, Modals)

The `<OverlayPlacement />` component is used to display experiments that appear on top of your UI, such as welcome popups, promotional modals, or full-screen takeovers. Simply render it at the top level of your screen component. It handles its own logic for when to appear based on the remote configuration.

This is ideal for:
- On-mount triggers (e.g., "Show a welcome message 2 seconds after the user opens the home screen").
- User-segment-based offers.

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { usePipeguruTriggers } from '@pipeguru/react-native';

const HomeScreen = () => {
  const { OverlayPlacement } = usePipeguruTriggers('home');

  return (
    <View style={{ flex: 1 }}>
      {/* This component will automatically handle showing popups */}
      <OverlayPlacement />
      <Text>Your screen content</Text>
    </View>
  );
};
```

### 2. Displaying Inline Content (Banners, Cards)

The `<InlinePlacement />` component renders content directly within your screen's layout. It's perfect for embedding promotional banners, feature announcements, or personalized cards that feel like a native part of the UI.

Place the component wherever you want the inline content to appear. Its size and content are controlled from the dashboard.

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { usePipeguruTriggers } from '@pipeguru/react-native';

const FeedScreen = () => {
  const { InlinePlacement } = usePipeguruTriggers('feed');

  return (
    <ScrollView>
      <Text>Content above the banner</Text>
      
      {/* Renders a promotional banner if one is configured */}
      <InlinePlacement />
      
      <Text>Content below the banner</Text>
    </ScrollView>
  );
};
```

### 3. Using Button Triggers

The `<TriggerButton />` component renders a remotely-configurable button. Your marketing team can control the button's appearance, text, and what experiment it launches when pressed. If no button is configured for the `screenId` in the dashboard, it will render nothing.

This is useful for user-initiated flows, like "Show me a demo" or "Claim my offer".

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { usePipeguruTriggers } from '@pipeguru/react-native';

const SettingsScreen = () => {
  const { TriggerButton } = usePipeguruTriggers('settings');

  return (
    <View style={{ flex: 1 }}>
      <Text>App Settings</Text>
      
      {/* Renders a button that might launch a "Rate the App" flow */}
      <TriggerButton />
    </View>
  );
};
```

### Putting It All Together

By instrumenting a screen once, you open up multiple opportunities for experiments that can be run independently from the dashboard.

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { usePipeguruTriggers } from '@pipeguru/react-native';

const HomeScreen = () => {
  // Instrument the screen with a unique ID
  const { OverlayPlacement, InlinePlacement, TriggerButton } = usePipeguruTriggers(
    'home',
    {
      attributes: {
        plan: 'premium',
        user_level: 'power_user',
        gender: 'female',
        city: 'Berlin',
        country: 'Germany',
        braze_segments: ['segment1', 'segment2'],
      },
    }
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Handles popups and full-screen takeovers */}
      <OverlayPlacement />

      <ScrollView>
        <Text>Welcome to our app!</Text>
        
        {/* Renders an inline promotional banner */}
        <InlinePlacement />
        
        <Text>More content here...</Text>
      </ScrollView>
      
      {/* Renders a floating action button or a button at the bottom */}
      <TriggerButton />
    </View>
  );
};
```

With this single-time setup, your non-technical teams are now empowered to:
- Launch a "Welcome" popup on the `home` screen.
- A/B test different promotional banners.
- Add a "Feedback" button that opens a survey flow.
...all without writing any new code.