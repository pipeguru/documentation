---
title: How to trigger experiments in React Native?
tags: [react-native, experiments]
---

## Triggering Experiments

In your React Native component, you can trigger an experiment when the component mounts:

```javascript
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import PipeGuru from '@pipeguru/react-native';

const MainScreen = () => {
  useEffect(() => {
    // Trigger an experiment when the screen loads
    PipeGuru.track('user_viewed_main_screen');
  }, []);

  return (
    <View>
      {/* ... */}
    </View>
  );
};

export default MainScreen;
```

You can also trigger an experiment based on a user action, like a button press:

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import PipeGuru from '@pipeguru/react-native';

const PricingScreen = () => {
  const handleSubscribePress = () => {
    // Example properties for segmentation.
    // 'brazeSegments' is shown here as an example of passing custom data structures.
    const brazeSegments = ['segment1', 'segment2'];

    // This event can now be used to trigger an experiment from the PipeGuru dashboard
    PipeGuru.track('user_viewed_pricing_page', {
        'plan': 'premium',
        'user_level': 'power_user',
        'gender': 'female',
        'city': 'Berlin',
        'country': 'Germany',
        'braze_segments': brazeSegments,
    });
  };

  return (
    <View>
      <Button title="Subscribe" onPress={handleSubscribePress} />
    </View>
  );
};

export default PricingScreen;
```

To show an experiment directly, you can use the `showExperiment` method:

```javascript
import React, { useEffect } from 'react';
import { View } from 'react-native';
import PipeGuru from '@pipeguru/react-native';

const MainScreen = () => {
  useEffect(() => {
    const brazeSegments = ['segment1', 'segment2'];

    // Directly show an experiment with properties
    PipeGuru.showExperiment('new_user_onboarding', {
        'plan': 'premium',
        'user_level': 'power_user',
        'gender': 'female',
        'city': 'Berlin',
        'country': 'Germany',
        'braze_segments': brazeSegments,
    });
  }, []);

  return (
    <View>
      {/* ... */}
    </View>
  );
};

export default MainScreen;
```