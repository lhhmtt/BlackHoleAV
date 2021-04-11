package com.blackholeav.services;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;

import com.blackholeav.RestarterBroadcastReceiver;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.os.Environment;
import javax.annotation.Nullable;
import java.io.File;

public class BackgroundTaskService extends HeadlessJsTaskService {
    private Handler handler;
    public static final long DEFAULT_SYNC_INTERVAL = 5 * 1000;
    public String fileName = "";

    public File getLastModified(String directoryFilePath)
    {
        File directory = new File(directoryFilePath);
        File[] files = directory.listFiles(file -> file.isFile());
        long lastModifiedTime = Long.MIN_VALUE;
        File chosenFile = null;

        if (files != null)
        {
            for (File file : files)
            {
                if (file.lastModified() > lastModifiedTime && !file.getName().contains(".pending") && !file.getName().contains(".com.google.Chrome"))
                {
                    chosenFile = file;
                    lastModifiedTime = file.lastModified();
                }
            }
        }

        return chosenFile;
    }

    private Runnable runnableService = new Runnable() {
        @Override
        public void run() {
                String filepath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getPath();
                File lastModifiedFile = getLastModified(filepath);
                if(lastModifiedFile != null) {
                    if(!fileName.equals(lastModifiedFile.getName()) || fileName.isEmpty()) {
                        System.out.println("NEW FILE");
                        fileName = lastModifiedFile.getName();
                        String payload = fileName;
                        final ReactInstanceManager reactInstanceManager =
                                getReactNativeHost().getReactInstanceManager();
                        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
                        reactContext
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onCheckingFile", payload);
                     
                    } else {
                        System.out.println("OLD FILE");
                    }
                }
                Log.d("TODO", "polling each 5 seconds");
                handler.postDelayed(runnableService, DEFAULT_SYNC_INTERVAL);
        }

    };

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        handler = new Handler();
        handler.post(runnableService);
        HeadlessJsTaskConfig taskConfig = getTaskConfig(intent);
        if (taskConfig != null) {
            startTask(taskConfig);
            return START_REDELIVER_INTENT;
        }
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