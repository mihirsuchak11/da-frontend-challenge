import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddSong from '../pages/AddSong/AddSong';
import NotFound from '../pages/NotFound/NotFound';
import SongsList from '../pages/SongsList/SongsList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <SongsList />
      </Route>
      <Route path='/add-song'>
        <AddSong />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
