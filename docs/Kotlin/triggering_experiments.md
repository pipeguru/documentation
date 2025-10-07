---
title: How to trigger experiments in Kotlin?
tags: [kotlin, experiments]
---

## Triggering Experiments

In your Android `Activity`, you can trigger an experiment when the activity is created:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.pipeguru.android.PipeGuru

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Trigger an experiment when the activity is created
        PipeGuru.track("user_viewed_main_screen")
    }
}
```

You can also trigger an experiment based on a user action, like a button click:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.pipeguru.android.PipeGuru

class PricingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pricing)
    }

    fun onSubscribeButtonClick(view: View) {
        // Example properties for segmentation.
        // 'braze_segments' is shown here as an example of passing custom data structures.
        val brazeSegments = listOf("segment1", "segment2")

        // This event can now be used to trigger an experiment from the PipeGuru dashboard
        PipeGuru.track("user_viewed_pricing_page", mapOf(
            "plan" to "premium",
            "user_level" to "power_user",
            "gender" to "female",
            "city" to "Berlin",
            "country" to "Germany",
            "braze_segments" to brazeSegments
        ))
    }
}
```

To show an experiment directly, you can use the `showExperiment` method:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.pipeguru.android.PipeGuru

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Directly show an experiment when the activity is first created.
        val brazeSegments = listOf("segment1", "segment2")

        PipeGuru.showExperiment("new_user_onboarding", this, mapOf(
            "plan" to "premium",
            "user_level" to "power_user",
            "gender" to "female",
            "city" to "Berlin",
            "country" to "Germany",
            "braze_segments" to brazeSegments
        ))
    }
}
```