import Home from "./pages/Home";
import Master from "./pages/Master";
import Story from "./pages/Story";
import Tryout from "./pages/Tryout";
import { Route, Switch } from "wouter";
import { basePath } from "./lib/paths";

export default function App() {
  return <Switch>
    <Route path={`${basePath}/master`} component={Master} />
    <Route path={`${basePath}/story`} component={Story} />
    <Route path={`${basePath}/tryout`} component={Tryout} />
    <Route path={`${basePath}/`} component={Home} />
  </Switch>;
}
