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
import java.util.List;
import java.util.ArrayList;

public class BackgroundTaskService extends HeadlessJsTaskService {
    private Handler handler;
    public static final long DEFAULT_SYNC_INTERVAL = 5 * 1000;
    public String fileName = "";
    public List<File> listAPK = new ArrayList<>();

    public File getLastModified(List<File> files)
    {
        long lastModifiedTime = Long.MIN_VALUE;
        File chosenFile = null;

        if (files != null)
        {
            for (File file : files)
            {
                String[] splitName = file.getName().split("\\.");
                String lastSplit = splitName[splitName.length - 1];
                if (file.lastModified() > lastModifiedTime && !file.getName().contains(".pending") && !file.getName().contains(".com.google.Chrome"))
                {
                    chosenFile = file;
                    lastModifiedTime = file.lastModified();
                }
            }
        }

        return chosenFile;
    }

    public void walk( String path ) {
        File root = new File( path );
        File[] list = root.listFiles();

        if (list != null) {
            for ( File f : list ) {
                if ( f.isDirectory() ) {
                    walk( f.getAbsolutePath() );
                }
                else {
                    String[] splitName = f.getName().split("\\.");
                    String lastSplit = splitName[splitName.length - 1];
                    if (lastSplit.equals("apk") && !listAPK.contains(f)) {
                        listAPK.add(f);
                    }
                }
            }
        }
    }

    private Runnable runnableService = new Runnable() {
        @Override
        public void run() {
                walk(Environment.getExternalStorageDirectory().getAbsolutePath());
                File lastModifiedFile = getLastModified(listAPK);
                if(lastModifiedFile != null) {
                    if(!fileName.equals(lastModifiedFile.getName()) || fileName.isEmpty()) {
                        System.out.println("NEW FILE " + lastModifiedFile.getName() + lastModifiedFile.getAbsoluteFile());
                        fileName = lastModifiedFile.getName();
                        WritableMap payload = Arguments.createMap();
                        payload.putString("name", fileName);
                        payload.putString("path", lastModifiedFile.getAbsoluteFile().toString());
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