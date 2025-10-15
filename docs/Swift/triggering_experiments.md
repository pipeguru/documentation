---
title: Triggering Experiments in Swift
tags: [swift, experiments]
sidebar_position: 2
---

## Triggering Experiments

The PipeGuru Swift SDK offers several ways to trigger experiments, designed to fit naturally into modern SwiftUI applications. You can display UI components like image cards and sheets directly, or trigger an experiment programmatically to get its data.

### Displaying a Card View

The `PipeGuruCardView` is a SwiftUI `View` that automatically triggers an experiment and displays its content. It's ideal for embedding promotional content or features directly within your app's UI.

The view handles its own loading and presentation logic. It expects the experiment payload to contain an `imageUrl` for the card's background and a `webviewUrl` (PipeGuruSheet or Deeplink) to open when the card is tapped. Both of these can be configured remotely in the pipeguru dashboard.

```swift
import SwiftUI
import PipeGuru

struct PersonalizedContentView: View {
    let brazeSegments: [String] = ["segment1", "segment2"]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // This view will trigger the experiment and display the resulting card.
                // We pass attributes for server-side targeting.
                // PipeGuruCardView is an `AsyncImage` and accepts its view modifiers
                PipeGuruCardView(
                    experimentId: "main_content_card", attributes: [
                        "plan": "premium",
                        "user_level": "power_user",
                        "gender": "female",
                        "city": "Berlin",
                        "country": "Germany",
                        "braze_segments": brazeSegments
                    ]
                )
            }
            .padding()
        }
    }
}
```

### Presenting a Sheet

To present an experiment in a modal sheet or full-screen cover (e.g., for an onboarding flow), use the `.pipeGuruSheet` view modifier. It binds to a boolean state variable to control its presentation.

This modifier expects the experiment payload to contain a `webviewUrl` which can be configured remotely in the pipeguru dashboard.

```swift
import SwiftUI
import PipeGuru

struct ContentView: View {
    @State private var showOnboarding = false
    let brazeSegments: [String] = ["segment1", "segment2"]

    var body: some View {
        Color.clear
        .onAppear { showOnboarding = true }
        .pipeGuruSheet(
            "newUserOnboarding",
            isPresented: $showOnboarding,
            style: .fullScreen, // or .sheet
            attributes: [
                "plan": "premium",
                "user_level": "power_user",
                "gender": "female",
                "city": "Berlin",
                "country": "Germany",
                "braze_segments": brazeSegments
            ]
        )
    }
}
```

These views also fire events throughout their lifecycle. The next section covers how to consume these events for analytics or to trigger custom in-app behavior.