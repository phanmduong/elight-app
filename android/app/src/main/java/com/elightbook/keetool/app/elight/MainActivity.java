package com.elightbook.keetool.app.elight;

import com.facebook.react.ReactActivity;
import com.tanguyantoine.react.MusicControl;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "elight";
    }
    @Override
    protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
    +           new MusicControl(),
                new MainReactPackage()
            );
        }
}
