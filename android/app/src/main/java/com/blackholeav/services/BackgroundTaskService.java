package com.blackholeav.services;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class BackgroundTaskService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    return new HeadlessJsTaskConfig(
                "BackgroundTask",
                extras != null ? Arguments.fromBundle(extras) : Arguments.createMap(),
                5000,
                true);
  }
}