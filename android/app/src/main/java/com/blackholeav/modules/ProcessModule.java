package com.blackholeav.modules; 

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;

import java.util.Map;
import java.util.HashMap;

import com.facebook.react.HeadlessJsTaskService;
import android.content.Intent;
import android.os.Bundle;
import com.blackholeav.services.BackgroundTaskService;

public class ProcessModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private int count = 0;
    
    public ProcessModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }
    
    @Override
    public String getName() {
        return "ProcessModule";
    }

    @ReactMethod
    public void startProcess() {
        if(count == 0) {
            Log.d("Debug","Here");
            Intent service = new Intent(this.reactContext, BackgroundTaskService.class);
            Bundle bundle = new Bundle();
            bundle.putString("foo", "bar");
            service.putExtras(bundle);

            this.reactContext.startService(service);
            HeadlessJsTaskService.acquireWakeLockNow(this.reactContext);
        }
        count = 1;
        
    }
}