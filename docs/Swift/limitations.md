---
title: Limitations on type of pipeguru experiments
tags: [swift, experiments]
sidebar_position: 4
---

## What Can You Do with PipeGuru?

PipeGuru is designed for speed and flexibility, allowing you to run experiments that present new user interfaces and flows. The primary use cases revolve around displaying content within SwiftUI views provided by the SDK:

*   **Presenting Web Content**: You can display any web-based content or user flow inside a `.pipeGuruSheet` (as a modal sheet or full-screen cover) or a `PipeGuruCardView`. This is ideal for promotional screens, surveys, new feature announcements, or multi-step flows that can be built with web technologies.
*   **In-App Purchases**: The SDK is equipped to track transactions initiated from experiment screens, with built-in support for App Store In-App Purchases.
*   **Deep Linking**: You can navigate users to any part of your app from a PipeGuru view using deep links.

## What Can't You Do? (Current Limitations)

While PipeGuru is powerful, it has some limitations you should be aware of. These are primarily related to modifying existing native UI components or critical authentication flows.

### 1. No Modification of Existing Native Components

PipeGuru experiments cannot directly alter the properties or behavior of your app's existing native UI components. For example, you cannot run an experiment to:

- Change the color, text, or position of a native SwiftUI `Button`.
- Rearrange elements in an existing native list.
- Add a badge to a native tab bar item.

Experiments are contained within the `PipeGuruCardView` and `PipeGuruSheet` views. The logic and presentation of what's inside these views are controlled remotely, but the views themselves are placed within your existing native layout.

### 2. No Inline Native Components

You cannot inject a new native component (like a `Toggle` or a `Slider`) directly into your existing view hierarchy as part of an experiment. Content displayed by PipeGuru is typically web-based or rendered inside the specific views provided by the SDK.

### 3. No Changes to Critical Authentication Flows

PipeGuru is not designed to experiment on core authentication flows like login, sign-up, or password reset pages. These flows are often highly complex, stateful, and security-sensitive. Attempting to override them with a web-based experiment could lead to a poor user experience and introduce security risks.

### 4. No Generic Web Checkouts with SDK Transaction Tracking

While you can display a web-based checkout flow within a `PipeGuruSheet`, the SDK's automatic transaction tracking (`transactionStarted`, `transactionCompleted`) is designed for native In-App Purchases (StoreKit).

If you use a standard web checkout inside a webview, you would need to implement a custom communication layer (e.g., using JavaScript bridges) to inform the native app about the transaction status and then manually fire your own analytics events. The PipeGuru SDK will not automatically detect a purchases made on your website. Our forward deployed engineers are happy to work with you on a specific requirement of this form.

## Platform and API Limits

Similar to other configuration-driven platforms, PipeGuru has limits to ensure performance and reliability. While these are subject to change and we're happy to work with you, please keep the following in mind:

- **Payload Size**: The JSON payload for an experiment, which includes URLs, text, and configuration from the pipeguru dashboard needs to be reasonably small (less than 1Mb). Excessively large payloads can increase latency for users and we offer lightspeed scores to help design flows for maximum speed.
- **Number of Attributes**: While there's no hard limit on the number of targeting attributes you can send, we recommend sending only the attributes necessary for server-side targeting to minimize network overhead. A practical limit is around 20-30 user attributes per request. 
- **API Rate Limiting**: The client-side SDK communicates with the PipeGuru backend to fetch experiment configurations. These endpoints are rate limited to protect the service from abuse and ensure high availability for all users. For a typical consumer app, you are unlikely to hit these limits during normal operation. In case you plan to run a load test specifically to test us or planning to run a huge marketing campaign, please give us a heads up and we'll manage this.