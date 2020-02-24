import React, { } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './components/GenericComponents/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import { createMusicService } from './services/musicService';
import './styles/custom.scss'

const App: React.FunctionComponent = () => {
  const musicService = createMusicService();

  return (
    <Layout>
      <Switch>
        <Route exact path='/about' component={About} />
        <Route path='/' render={() => <Home musicService={musicService} />} />
      </Switch>
    </Layout>
  );
}

export default App;