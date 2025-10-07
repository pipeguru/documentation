---
title: Flutter Installation Guide
tags: [flutter, installation]
---

## Getting Started with PipeGuru for Flutter

This guide will walk you through the steps to integrate PipeGuru into your Flutter application.

### 1. Add Dependency

First, add the PipeGuru dependency to your `pubspec.yaml` file.

```yaml
dependencies:
  pipeguru_flutter: ^1.0.0
```

### 2. Install the SDK

Next, run the following command in your terminal to install the SDK:

```bash
flutter pub get
```

### 3. Initialize PipeGuru

In your `main.dart` file, import and initialize PipeGuru.

```dart
import 'package:pipeguru/pipeguru.dart';

void main() {
  // Initialize PipeGuru with your API key
  PipeGuru.initialize("YOUR_API_KEY");
  runApp(MyApp());
}
```

That's it! You're now ready to use PipeGuru in your Flutter project.
