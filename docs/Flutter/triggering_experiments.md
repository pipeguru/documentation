---
title: How to trigger experiments in Flutter?
tags: [flutter, experiments]
---

## Triggering Experiments

In your Flutter widget, you can trigger an experiment when the widget is initialized:

```dart
import 'package:flutter/material.dart';
import 'package:pipeguru_flutter/pipeguru_flutter.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  void initState() {
    super.initState();
    // Trigger an experiment when the screen loads
    PipeGuru.track('user_viewed_main_screen');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
    );
  }
}
```

You can also trigger an experiment based on a user action, like a button press:

```dart
import 'package:flutter/material.dart';
import 'package:pipeguru_flutter/pipeguru_flutter.dart';

class PricingScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Example properties for segmentation.
            // 'braze_segments' is shown here as an example of passing custom data structures.
            final brazeSegments = ['segment1', 'segment2'];

            // This event can now be used to trigger an experiment from the PipeGuru dashboard
            PipeGuru.track('user_viewed_pricing_page', properties: {
                'plan': 'premium',
                'user_level': 'power_user',
                'gender': 'female',
                'city': 'Berlin',
                'country': 'Germany',
                'braze_segments': brazeSegments
            });
          },
          child: Text('Subscribe'),
        ),
      ),
    );
  }
}
```

To show an experiment directly, you can use the `showExperiment` method:

```dart
import 'package:flutter/material.dart';
import 'package:pipeguru_flutter/pipeguru_flutter.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final brazeSegments = ['segment1', 'segment2'];

      // Directly show an experiment. This method requires a BuildContext
      // to present the experiment UI (e.g., as a new screen or dialog).
      PipeGuru.showExperiment('new_user_onboarding', context: context, properties: {
          'plan': 'premium',
          'user_level': 'power_user',
          'gender': 'female',
          'city': 'Berlin',
          'country': 'Germany',
          'braze_segments': brazeSegments
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
    );
  }
}
```