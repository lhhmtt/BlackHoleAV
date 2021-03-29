package com.blackholeav;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.blackholeav.services.BackgroundTaskService;

public class RestarterBroadcastReceiver extends BroadcastReceiver {
 @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(RestarterBroadcastReceiver.class.getSimpleName(), "restart service!!");
        context.startService(new Intent(context, BackgroundTaskService.class));;
    }
}