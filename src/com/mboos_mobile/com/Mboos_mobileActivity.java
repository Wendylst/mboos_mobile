package com.mboos_mobile.com;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class Mboos_mobileActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}