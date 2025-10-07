---
title: Swift Installation Guide
tags: [swift, installation]
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

In your `AppDelegate.swift`, import and initialize PipeGuru.

```swift
import PipeGuru

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Initialize PipeGuru with your API key
    PipeGuru.initialize("YOUR_API_KEY")
    return true
}
```

That's it! You're now ready to use PipeGuru in your Swift project.
