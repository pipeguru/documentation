---
title: How to trigger experiments in Swift?
tags: [swift, experiments]
---

## Triggering Experiments

In your `UIViewController`, you can trigger an experiment when the view appears:

```swift
import UIKit
import PipeGuru

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Trigger an experiment once when the view is loaded
        PipeGuru.track("user_viewed_main_screen")
    }
}
```

You can also trigger an experiment based on a user action, like a button click:

```swift
import UIKit
import PipeGuru

class PricingViewController: UIViewController {

    @IBAction func didTapSubscribeButton(_ sender: Any) {
        // This event can now be used to trigger an experiment from the PipeGuru dashboard

        // Example properties for segmentation.
        // 'brazeSegments' is shown here as an example of passing custom data structures.
        let brazeSegments: [String] = ["segment1", "segment2"]

        PipeGuru.track("user_viewed_pricing_page", properties: [
            "plan": "premium",
            "user_level": "power_user",
            "gender": "female",
            "city": "Berlin",
            "country": "Germany",
            "braze_segments": brazeSegments
        ])
    }
}
```

To show an experiment directly, you can use the `showExperiment` method:

```swift
import UIKit
import PipeGuru

class ViewController: UIViewController {

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        // Directly show an experiment. The 'for' parameter expects a UIViewController
        // instance to be able to present the experiment UI, for example as a modal.
        let brazeSegments: [String] = ["segment1", "segment2"]

        PipeGuru.showExperiment(withKey: "new_user_onboarding", for: self, properties: [
            "plan": "premium",
            "user_level": "power_user",
            "gender": "female",
            "city": "Berlin",
            "country": "Germany",
            "braze_segments": brazeSegments
        ])
    }
}
```