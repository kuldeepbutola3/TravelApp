import React, {Component} from 'react';

// import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StoreProvider} from './provider';
import I18Provider from './utils/i18n/src/Provider';
import {RootNav} from './navigation/RootNav';
import {ToastProvider} from './idg/toast/ToastProvider';

// NOTE: Change this boolean to true to render the Storybook view for development!
// This will work with the Storybook server once this storybook PR merges:
// https://github.com/storybookjs/react-native/pull/30

class App extends Component<{}> {
  public state = {store: {}};

  public async componentDidMount() {
    this.setupApp();
  }
  public render() {
    // uncomment the rest of this method when setting up Apollo or MST/Redux
    // const isLoaded = this.state; // && this.state.client or this.state.store

    // if (!isLoaded) {
    //   // render nothing by default, should be covered by the splash screen
    //   return null;
    // }

    return (
      <StoreProvider>
        <I18Provider>
          <SafeAreaProvider>
            <ToastProvider>
              <RootNav />
            </ToastProvider>
          </SafeAreaProvider>
        </I18Provider>
      </StoreProvider>
    );
  }
  private setupApp() {
    try {
      // TODO: revisit this section if/when we find our StoreProvider's
      // setup is time consuming.
      //
      // Use this block to setup either the store or the apollo client
      //     const store = configureStore();
      //     this.setState({ store });
      //
      // const client = await setupApolloClient();
      // this.setState({ client })
    } catch (error) {
      throw error;
    } finally {
      // Now that everything is hydrated, hide the splashscreen
      // SplashScreen.hide();
    }
  }
}

export default App;
