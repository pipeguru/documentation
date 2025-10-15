---
title: Swift Installation Guide
tags: [swift, installation]
sidebar_position: 1
---

## Getting Started with PipeGuru for Swift

This guide will walk you through the steps to integrate PipeGuru into your Swift application.

### 1. Requirements

Minimum requirements:
- iOS 13.0+
- Xcode 14.0+
- Swift 5.7+

### 2. Add Package Dependency

In Xcode, go to `File > Add Packages...` and enter the following repository URL:

```
https://github.com/pipeguru/pipeguru-swift.git
```

Choose the latest version and add it to your project.

### 3. Initialize PipeGuru

You should initialize the PipeGuru SDK when your app starts. The way you do this depends on whether your app uses the SwiftUI App Life Cycle or the UIKit App Delegate.

#### For SwiftUI Apps
If your app's entry point is a `struct` that conforms to `App`, initialize PipeGuru in the `init()` method.

```swift
import SwiftUI
import PipeGuru

@main
struct YourApp: App {
    init() {
        // Initialize PipeGuru with your API key
        PipeGuru.initialize(apiKey: "YOUR_API_KEY")
    }

    var body: some Scene {
        WindowGroup {
            // Replace this with your app's root view
            ContentView() 
        }
    }
}
```

#### For UIKit Apps
In your `AppDelegate.swift`, import and initialize PipeGuru inside `application(_:didFinishLaunchingWithOptions:)`.
```swift
import PipeGuru

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Initialize PipeGuru with your API key
    PipeGuru.initialize(apiKey: "YOUR_API_KEY")
    return true
}
```

That's it! You're now ready to use PipeGuru in your Swift project.
