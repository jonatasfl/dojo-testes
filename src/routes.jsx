import { Switch, Route } from 'react-router-dom';

import DashboardPage from './pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
    </Switch>
  );
}
