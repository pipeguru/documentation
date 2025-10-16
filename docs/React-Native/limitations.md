---
title: Limitations on type of pipeguru experiments
tags: [react-native, experiments]
sidebar_position: 4
---

## What Can You Do with PipeGuru?

PipeGuru for React Native is designed for maximum flexibility, allowing you to run experiments from anywhere in your code. By using the `usePipeguruTriggers` hook, you can remotely control and display various UI placements. The primary use cases are:

*   **Presenting Overlays**: You can display any web-based content or user flow as a modal or full-screen takeover using the `<OverlayPlacement />` component. This is ideal for promotional screens, surveys, or new feature announcements.
*   **Embedding Inline Content**: Unlike our Swift SDK, the React Native SDK allows you to embed remotely-configured components like banners or cards directly into your screen's layout with the `<InlinePlacement />` component.
*   **Adding Trigger Buttons**: You can render a remotely-configurable button using the `<TriggerButton />` component, which can launch an experiment when pressed.
*   **In-App Purchases**: The SDK is equipped to track transactions initiated from experiment screens, with built-in support for App Store and Google Play In-App Purchases.
*   **Deep Linking**: You can navigate users to any part of your app from a PipeGuru view using deep links.

## What Can't You Do? (Current Limitations)

While PipeGuru for React Native is powerful, it has some limitations you should be aware of. These are primarily related to modifying existing native UI components or critical authentication flows.

### 1. No Direct Modification of Existing Native Components

PipeGuru experiments cannot directly alter the properties or behavior of your app's existing native React Native components. For example, you cannot run an experiment to:

- Change the color, text, or style of an existing `<Button>` or `<Text>` component in your JSX.
- Rearrange elements in an existing `<FlatList>`.
- Add a badge to a native tab bar item.

Experiments are contained within the components provided by the `usePipeguruTriggers` hook (`<OverlayPlacement />`, `<InlinePlacement />`, `<TriggerButton />`). The logic and presentation of what's inside these components are controlled remotely, but the components themselves are placed within your existing native layout.

Since we absorb the design system of the original application we can recreate experiences which look indistinguishable from native components.

### 2. No Changes to Critical Authentication Flows

PipeGuru is not designed to experiment on core authentication flows like login, sign-up, or password reset pages. These flows are often highly complex, stateful, and security-sensitive. Attempting to override them with a web-based experiment could lead to a poor user experience and introduce security risks.

### 3. No Generic Web Checkouts with SDK Transaction Tracking

While you can display a web-based checkout flow within an `<OverlayPlacement />`, the SDK's automatic transaction tracking (`transactionStarted`, `transactionCompleted`) is designed for native In-App Purchases (StoreKit/Google Play Billing).

If you use a standard web checkout inside a webview, you would need to implement a custom communication layer (e.g., using JavaScript bridges) to inform the native app about the transaction status and then manually fire your own analytics events. The PipeGuru SDK will not automatically detect purchases made on your website. Our forward deployed engineers are happy to work with you on a specific requirement of this form.

## Platform and API Limits

Similar to other configuration-driven platforms, PipeGuru has limits to ensure performance and reliability. While these are subject to change and we're happy to work with you, please keep the following in mind:

- **Payload Size**: The JSON payload for an experiment, which includes URLs, text, and configuration from the pipeguru dashboard needs to be reasonably small (less than 1Mb). Excessively large payloads can increase latency for users and we offer lightspeed scores to help design flows for maximum speed.
- **Number of Attributes**: While there's no hard limit on the number of targeting attributes you can send, we recommend sending only the attributes necessary for server-side targeting to minimize network overhead. A practical limit is around 20-30 user attributes per request.
- **API Rate Limiting**: The client-side SDK communicates with the PipeGuru backend to fetch experiment configurations. These endpoints are rate limited to protect the service from abuse and ensure high availability for all users. For a typical consumer app, you are unlikely to hit these limits during normal operation. In case you plan to run a load test specifically to test us or planning to run a huge marketing campaign, please give us a heads up and we'll manage this.
