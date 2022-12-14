import {
  AgentProvider,
  AuthProvider,
  ConfigurationContext,
  ConfigurationProvider,
  NetworkProvider,
  StoreProvider,
  ThemeProvider,
  theme,
  initLanguages,
  initStoredLanguage,
  translationResources,
  ErrorModal,
  toastConfig,
  RootStack,
  NetInfo,
  OnboardingPages,
  Splash,
  Terms,
  HomeContentView,
  UseBiometry,
  Record,
} from "aries-bifold";
import * as oca from 'aries-bifold/App/types/oca'
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Toast from "react-native-toast-message";
import cpqdLedger from "./src/config/ledgers/indy"

const defaultConfiguration: ConfigurationContext = {
  pages: OnboardingPages,
  splash: Splash,
  terms: Terms,
  homeContentView: HomeContentView,
  OCABundle: new oca.DefaultOCABundleResolver().loadDefaultBundles(),
  useBiometry: UseBiometry,
  record: Record,
  indyLedgers: [cpqdLedger]
};

initLanguages(translationResources);

const App = () => {
  initStoredLanguage();

  useEffect(() => {
    // Hide the native splash / loading screen so that our
    // RN version can be displayed.
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider>
      <AgentProvider>
        <ThemeProvider value={theme}>
          <ConfigurationProvider value={defaultConfiguration}>
            <AuthProvider>
              <NetworkProvider>
                <StatusBar
                  hidden={false}
                  barStyle="light-content"
                  backgroundColor={theme.ColorPallet.brand.primary}
                  translucent={false}
                />
                <NetInfo />
                <ErrorModal />
                <RootStack />
                <Toast topOffset={15} config={toastConfig} />
              </NetworkProvider>
            </AuthProvider>
          </ConfigurationProvider>
        </ThemeProvider>
      </AgentProvider>
    </StoreProvider>
  );
};

export default App;
