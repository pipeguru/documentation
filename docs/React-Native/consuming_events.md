---
title: Consuming SDK Events
tags: [react-native, events, analytics]
sidebar_position: 3
---

## Consuming Events with Event Listeners

PipeGuru's SDK emits a variety of events throughout the lifecycle of an experiment or feature rollout. By subscribing to these events, you can forward them to your own analytics, attribute revenue, or trigger custom in-app behavior.

The most idiomatic way to consume these events in React Native is by listening to `PipeGuru.events`.

### 1. Add an Event Listener

You can listen for all PipeGuru events by adding a listener to `PipeGuru.events`. This is best done in a top-level component like `App.tsx` to ensure the listener is active throughout your app's lifecycle.

We recommend using a `useEffect` hook to add the listener when the component mounts and remove it when it unmounts to prevent memory leaks.

```typescript
import { useEffect } from 'react';
import { PipeGuru, PipeGuruEvent, PipeGuruEventData } from '@pipeguru/react-native';

const App = () => {
  useEffect(() => {
    const listener = PipeGuru.events.addListener(
      'onPipeGuruEvent',
      (event: PipeGuruEventData) => {
        // Handle the event here
        console.log('PipeGuru Event Fired:', event.name, event.properties);
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      listener.remove();
    };
  }, []);

  // ... your app's components
};
```

### 2. Handle Specific Events

The event listener receives a single object containing the event `name` and its `properties`. You can use a `switch` statement to handle different event types. For cleaner code, we recommend using a helper function like `trackAnalytics` to forward events to your analytics platform.

```typescript
import { useEffect } from 'react';
import { PipeGuru, PipeGuruEvent, PipeGuruEventData } from '@pipeguru/react-native';

// Your analytics tracking function
const trackAnalytics = (eventName: string, properties: { [key: string]: any }) => {
  // e.g., Analytics.track(eventName, properties);
  console.log(`Tracking analytics for ${eventName}`, properties);
};

const App = () => {
  useEffect(() => {
    const handlePipeGuruEvent = (event: PipeGuruEventData) => {
      switch (event.name) {
        case PipeGuruEvent.ExperimentStarted:
          trackAnalytics('Experiment Started', event.properties);
          break;

        case PipeGuruEvent.ScreenViewed:
          trackAnalytics('Screen Viewed', event.properties);
          break;

        case PipeGuruEvent.TransactionStarted:
          trackAnalytics('Transaction Started', event.properties);
          break;

        case PipeGuruEvent.TransactionCompleted:
          trackAnalytics('Transaction Completed', event.properties);
          // You can also forward this to other SDKs, like Adjust
          break;

        case PipeGuruEvent.TransactionFailed:
          // Logger.error("Transaction failed", { extra: event.properties });
          break;

        case PipeGuruEvent.ExperimentDeliveryFailed:
          // Logger.warning("Failed to deliver experiment", { extra: event.properties });
          break;

        case PipeGuruEvent.ExperimentEnded:
          trackAnalytics('Experiment Ended', event.properties);
          break;
      }
    };

    const listener = PipeGuru.events.addListener('onPipeGuruEvent', handlePipeGuruEvent);

    return () => listener.remove();
  }, []);

  // ... your app's components
};
```

## Available Events

The `PipeGuruEvent` enum provides the names for each event, and the `properties` object contains detailed information for each stage of the user's journey.

### `experimentStarted`
Fired when a user is enrolled in an experiment.
- `experimentId: string`
- `campaignId: string`
- `variantId: string`

### `screenViewed`
Fired each time a new screen within a PipeGuru flow is presented to the user.
- `screenName: string`
- `screenId: string`
- `experimentId: string`
- `campaignId: string`

### `transactionStarted`
Fired when a transaction is initiated from an experiment screen.
- `productIdentifier: string`
- `experimentId: string`
- `campaignId: string`

### `transactionCompleted`
Fired upon successful completion of a transaction.
- `productIdentifier: string`
- `purchaseType: 'appStoreIAP' | 'internalService'`
- `transactionId: string`
- `revenue: number`
- `currency: string`
- `experimentId: string`
- `campaignId: string`

### `transactionFailed`
Fired if a transaction fails.
- `error: string`
- `productIdentifier: string`
- `experimentId: string`
- `campaignId: string`

### `experimentDeliveryFailed`
Fired when an experiment could not be loaded and a fallback was shown.
- `error: string`
- `experimentId: string`
- `campaignId: string`

### `experimentEnded`
Fired when the user completes or exits the experiment flow.
- `experimentId: string`
- `campaignId: string`

---

## Example: Forwarding Events to Adjust

Here’s how you can forward PipeGuru purchase events to Adjust. First, ensure you have the Adjust SDK integrated. You will need to create event tokens in your Adjust dashboard.

```typescript
import { Adjust, AdjustEvent } from 'react-native-adjust';
import { PipeGuru, PipeGuruEvent, PipeGuruEventData } from '@pipeguru/react-native';

// In a real app, manage your tokens in a centralized, type-safe way.
const AdjustEventTokens = {
  appStorePurchase: 'YOUR_IOS_EVENT_TOKEN', // Create in Adjust dashboard
  internalServicePurchase: 'YOUR_INTERNAL_TOKEN', // Create in Adjust dashboard
};

const handlePipeGuruEvent = (event: PipeGuruEventData) => {
  if (event.name === PipeGuruEvent.TransactionCompleted) {
    const { revenue, currency, transactionId, productIdentifier, experimentId, purchaseType } = event.properties;

    let eventToken;
    if (purchaseType === 'appStoreIAP') {
      eventToken = AdjustEventTokens.appStorePurchase;
    } else {
      eventToken = AdjustEventTokens.internalServicePurchase;
    }

    const adjustEvent = new AdjustEvent(eventToken);
    adjustEvent.setRevenue(revenue, currency);
    adjustEvent.setTransactionId(transactionId);
    adjustEvent.addCallbackParameter('product_id', productIdentifier);
    adjustEvent.addCallbackParameter('pipeguru_experiment_id', experimentId);

    Adjust.trackEvent(adjustEvent);
  }
};

// Add this listener in your app's setup
PipeGuru.events.addListener('onPipeGuruEvent', handlePipeGuruEvent);
```
