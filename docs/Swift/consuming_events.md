---
title: Consuming SDK Events
tags: [swift, events, analytics]
sidebar_position: 3
---

## Consuming Events with PipeGuruDelegate

PipeGuru's SDK emits a variety of events throughout the lifecycle of an experiment or feature rollout. By subscribing to these events, you can forward them to your own analytics, attribute revenue, or trigger custom in-app behavior.

The easiest way to consume these events in Swift is by using the `PipeGuruDelegate` protocol.

### 1. Conform to the Delegate

First, make your class conform to the `PipeGuruDelegate` protocol. This is often done in your `AppDelegate` or a central service class.

```swift
import PipeGuru

class AppDelegate: UIResponder, UIApplicationDelegate, PipeGuruDelegate {
    // MyAnalyticsService.shared.track(
    //  event: eventInfo.event.description,
    //  params: eventInfo.params
    // )
}
```

### 2. Set the Delegate

In your `application(_:didFinishLaunchingWithOptions:)` method, after initializing PipeGuru, set its delegate to `self`.

```swift
import PipeGuru

class AppDelegate: UIResponder, UIApplicationDelegate, PipeGuruDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        PipeGuru.initialize("YOUR_API_KEY")
        PipeGuru.delegate = self // Set the delegate
        return true
    }
    
    // ... delegate methods will go here
}
```

### 3. Implement the Delegate Method

The delegate protocol has one required method, `pipeGuru(didFireEvent:)`. You can `switch` on the `PipeGuruEvent` enum to handle different event types. For cleaner code, we recommend using a helper function `trackAnalytics` to forward events to your analytics platform.

```swift
func pipeGuru(didFireEvent event: PipeGuruEvent) {
    switch event {
    case .experimentStarted(let data):
        trackAnalytics(
            "Experiment Started",
            properties: [
            "pipeguru_experiment_id": data.experimentId,
            "pipeguru_campaign_id": data.campaignId,
            "pipeguru_variant_id": data.variantId
            ]
        )

    case .screenViewed(let data):
        trackAnalytics(
            "Screen Viewed",
            properties: [
            "pipeguru_screen_name": data.screenName,
            "pipeguru_screen_id": data.screenId,
            "pipeguru_experiment_id": data.experimentId
            ]
        )

    case .transactionStarted(let data):
        trackAnalytics(
            "Transaction Started",
            properties: [
            "product_id": data.productIdentifier,
            "pipeguru_experiment_id": data.experimentId
            ]
        )

    case .transactionCompleted(let data):
        trackAnalytics(
            "Transaction Completed",
            properties: [
            "product_id": data.productIdentifier,
            "purchase_type": data.purchaseType.rawValue,
            "transaction_id": data.transactionId,
            "revenue": data.revenue,
            "currency": data.currency,
            "pipeguru_experiment_id": data.experimentId,
            "pipeguru_campaign_id": data.campaignId
            ]
        )
    
    case .transactionFailed(let data):
        // Logger.error("Transaction failed", error: data.error, extra: ["product_id": data.productIdentifier])

    case .experimentDeliveryFailed(let data):
        // Fired when an experiment could not be loaded (e.g. network error)
        // and a fallback was shown.
        // Logger.warning("Failed to deliver experiment", error: data.error, extra: ["experiment_id": data.experimentId])

    case .experimentEnded(let data):
        trackAnalytics(
            "Experiment Ended",
            properties: [
            "pipeguru_experiment_id": data.experimentId,
            "pipeguru_campaign_id": data.campaignId
            ]
        )
    }
}

private func trackAnalytics(_ eventName: String, properties: [String: Any]) {
    // Your analytics provider's tracking method goes here.
    // e.g., Analytics.track(eventName, properties: properties)
}
```

## Available Events

The `PipeGuruEvent` enum provides detailed information for each stage of the user's journey through an experiment.

### `experimentStarted`
Fired when a user is enrolled in an experiment.
- `experimentId: String`
- `campaignId: String`
- `variantId: String`

### `screenViewed`
Fired each time a new screen within a PipeGuru flow is presented to the user. This is key for multi-step flows.
- `screenName: String`
- `screenId: String`
- `experimentId: String`
- `campaignId: String`

### `transactionStarted`
Fired when a transaction is initiated from an experiment screen.
- `productIdentifier: String`
- `experimentId: String`
- `campaignId: String`

### `transactionCompleted`
Fired upon successful completion of a transaction.
- `productIdentifier: String`
- `purchaseType: PipeGuruPurchaseType`
- `transactionId: String`
- `revenue: Double`
- `currency: String`
- `experimentId: String`
- `campaignId: String`

### `transactionFailed`
Fired if a transaction fails.
- `error: Error`
- `productIdentifier: String`
- `experimentId: String`
- `campaignId: String`

### `experimentDeliveryFailed`
Fired when an experiment could not be loaded (e.g. due to a network error) and a fallback was shown instead.
- `error: Error`
- `experimentId: String`
- `campaignId: String`

### `experimentEnded`
Fired when the user completes or exits the experiment flow.
- `experimentId: String`
- `campaignId: String`

---

## Example: Forwarding Events to Adjust

Here’s how you can forward PipeGuru events to [Adjust](https://adjust.com/) to measure campaign performance. First, ensure you have the Adjust SDK integrated.

You will need to create event tokens in your Adjust dashboard for the PipeGuru events you wish to track.

```swift
import Adjust
import PipeGuru
import StoreKit

// In a real app, manage your tokens in a centralized, type-safe way.
struct AdjustEventTokens {
    static let appStorePurchase = "YOUR_IOS_EVENT_TOKEN"       // Create in Adjust dashboard
    static let internalServicePurchase = "YOUR_INTERNAL_TOKEN"  // Create in Adjust dashboard
}

// In your PipeGuruDelegate implementation
@available(iOS 15.0, *) // StoreKit 2
func pipeGuru(didFireEvent event: PipeGuruEvent) {
    switch event {
    case .transactionCompleted(let data):
        switch data.purchaseType {
        case .appStoreIAP:
            guard let transaction = data.storeKit2Transaction else { return }
            
            // Verify-and-track in a single call (SDK v5 purchase verification)
            // Ensure Purchase Verification is enabled in Adjust and App Store Connect credentials are set.
            // Configure your event with revenue, currency, transactionId, and product info.
            guard let adjEvent = ADJEvent(eventToken: AdjustEventTokens.appStorePurchase) else { return }
            adjEvent?.setRevenue(data.revenue, currency: data.currency)
            adjEvent?.setTransactionId(data.transactionId)
            adjEvent?.addCallbackParameter("product_id", value: data.productIdentifier)
            adjEvent?.addCallbackParameter("pipeguru_experiment_id", value: data.experimentId)

            Adjust.verifyAndTrackAppStorePurchase(adjEvent) { result in
                // result.verificationStatus / result.code / result.message
            }

        case .internalService:
            // Standard revenue event for non-App Store purchases
            let adjEvent = ADJEvent(eventToken: AdjustEventTokens.internalServicePurchase)
            adjEvent?.setRevenue(data.revenue, currency: data.currency)
            adjEvent?.setTransactionId(data.transactionId)
            adjEvent?.addCallbackParameter("product_id", value: data.productIdentifier)
            adjEvent?.addCallbackParameter("pipeguru_experiment_id", value: data.experimentId)
            
            Adjust.trackEvent(adjEvent)
        }
    
    default:
        // Handle other PipeGuru events or ignore them.
        break
    }
}
```