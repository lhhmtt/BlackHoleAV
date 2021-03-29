package com.blackholeav.services;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;

import com.blackholeav.RestarterBroadcastReceiver;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import javax.annotation.Nullable;

public class BackgroundTaskService extends HeadlessJsTaskService {
    private Handler handler;

    public static final long DEFAULT_SYNC_INTERVAL = 10 * 1000;

    private Runnable runnableService = new Runnable() {
        @Override
        public void run() {
            //create AsyncTask here
            Log.d("TODO", "polling each 10 seconds");

            handler.postDelayed(runnableService, DEFAULT_SYNC_INTERVAL);
        }
    };

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        handler = new Handler();
        handler.post(runnableService);

        return START_STICKY;
    }

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "BackgroundTask",
                extras != null ? Arguments.fromBundle(extras) : Arguments.createMap(),
                5000,
                true);
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Intent broadcastIntent = new Intent(this, RestarterBroadcastReceiver.class);

        sendBroadcast(broadcastIntent);
        super.onTaskRemoved(rootIntent);
    }
}