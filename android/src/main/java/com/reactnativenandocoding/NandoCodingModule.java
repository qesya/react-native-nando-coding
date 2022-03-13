package com.reactnativenandocoding;

import android.content.SharedPreferences;
import android.os.Build;
import android.preference.PreferenceManager;
import android.util.Log;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReactMethod;


import java.util.HashMap;
import java.util.Map;

@ReactModule(name = NandoCodingModule.NAME)
public class NandoCodingModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public static final String NAME = "NandoCodingModule";
  private static native void nativeInstall(long jsiPtr, String docDir);

  private static final String APP_VERSION = "appVersion";
  private static final String APP_BUILD = "buildVersion";
  private static final String APP_ID = "bundleIdentifier";

  public NandoCodingModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean install() {
    try {
      System.loadLibrary("cpp");

      ReactApplicationContext context = getReactApplicationContext();
      nativeInstall(
        context.getJavaScriptContextHolder().get(),
        context.getFilesDir().getAbsolutePath()
      );
      return true;
    } catch (Exception exception) {
      return false;
    }
  }

  public String getHelloWorld() {
    return "Hello World Nando's Coding Test FROM JSI Android";
  }

//  public Map<String, Object> getAppInfo() {
//    final Map<String, Object> constants = new HashMap<>();
//    final PackageManager packageManager = this.reactContext.getPackageManager();
//    final String packageName = this.reactContext.getPackageName();
//    try {
//      constants.put(APP_VERSION, packageManager.getPackageInfo(packageName, 0).versionName);
//      constants.put(APP_BUILD, packageManager.getPackageInfo(packageName, 0).versionCode);
//      constants.put(APP_ID, packageName);
//    } catch (NameNotFoundException e) {
//      e.printStackTrace();
//    }
//    return constants;
//  }

  public String getModel() {
    String manufacturer = Build.MANUFACTURER;
    String model = Build.MODEL;
    if (model.startsWith(manufacturer)) {
      return model;
    } else {
      return manufacturer + " " + model;
    }
  }

  public void setItem(final String key, final String value) {

    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this.getReactApplicationContext());
    SharedPreferences.Editor editor = preferences.edit();
    editor.putString(key,value);
    editor.apply();
  }

  public String getItem(final String key) {
    SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this.getReactApplicationContext());
    String value = preferences.getString(key, "");
    return value;
  }

}
