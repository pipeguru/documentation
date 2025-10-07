---
title: Kotlin Installation Guide
tags: [kotlin, installation]
---

## Getting Started with PipeGuru for Kotlin

This guide will walk you through the steps to integrate PipeGuru into your Kotlin (Android) application.

### 1. Add Dependency

Add the PipeGuru dependency to your app-level `build.gradle.kts` file.

```kotlin
dependencies {
    implementation("com.pipeguru:pipeguru-android:1.0.0")
}
```

### 2. Sync Project

Sync your project with the Gradle files to download the dependency.

### 3. Initialize PipeGuru

In your `MainApplication.kt` file, import and initialize PipeGuru.

```kotlin
import com.pipeguru.android.PipeGuru

class MainApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize PipeGuru with your API key
        PipeGuru.initialize(this, "YOUR_API_KEY")
    }
}
```

That's it! You're now ready to use PipeGuru in your Kotlin project.
