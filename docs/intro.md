---
sidebar_position: 1
---
# Getting Started with PipeGuru

Welcome to the PipeGuru developer documentation. PipeGuru empowers your product, marketing, and sales teams to launch mobile A/B tests and feature rollouts in minutes, without writing any code.

Your job is to complete a one-time setup. This guide will walk you through installing the SDK and instrumenting the events that will trigger experiments. Once you're done, your non-technical teammates can take it from there.

## 1. Install the SDK

Integrating our lightweight SDK is a simple, two-step process. First, add the dependency, then initialize it with your API key.

### Platform-Specific Installation

- [React Native](/React-Native/installation)
- [Swift](/Swift/installation)
- [Flutter](/Flutter/installation)
- [Kotlin](/Kotlin/installation)

For example, in an iOS app using Swift Package Manager:

```swift
import PipeGuru

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  PipeGuru.initialize("YOUR_API_KEY")
  return true
}
```

That's it. The SDK is now installed.

## 2. Trigger Experiments with Events

PipeGuru experiments are launched by events. You can trigger an experiment anywhere in your app by tracking an event and passing along user properties for targeting.

This context allows your team to create powerful segments, like showing an experiment only to "female users in Berlin" or "male users in Brazil".

### Platform-Specific Triggers

- [React Native](/React-Native/triggering_experiments)
- [Swift](/Swift/triggering_experiments)
- [Flutter](/Flutter/triggering_experiments)
- [Kotlin](/Kotlin/triggering_experiments)

For example, in an iOS app using Swift:

```swift
// This event can now be used to trigger an experiment from the PipeGuru dashboard
PipeGuru.track("user_viewed_pricing_page", properties: [
    "plan": "premium",
    "user_level": "power_user",
    "gender": "female",
    "city": "Berlin",
    "country": "Germany"
])
```

With this single line, you've now empowered your team to run experiments on the pricing page for any user segment they can imagine.

## 3. Manage Experiments and Rollouts

Once the SDK is installed and events are tracked, your work is done. Your non-technical team members can now independently create, launch, and manage experiments and feature rollouts directly from the PipeGuru web console.

They can build new UI in our webview editor, define target audiences, and roll out changes to a small percentage of users. Every change is versioned, so they can monitor results and instantly roll back any experiment that isn't performing well, all without needing 24x7 devops.

We are still expanding the documentation here with screenshots.

## 4. Integrate with Your Stack

PipeGuru plays well with others. You can easily forward all experiment and event data to your existing analytics and CRM platforms.

Whether you use Segment, Amplitude, Mixpanel, or want to send conversion data to Salesforce, PipeGuru ensures a seamless flow of information across your entire stack. This gives you a unified view of your user's journey and the impact of every experiment.
