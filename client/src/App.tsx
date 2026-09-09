import Home from "./pages/Home";
import Master from "./pages/Master";
import Story from "./pages/Story";
import Tryout from "./pages/Tryout";
import { Route, Switch } from "wouter";

export default function App() {
  return <Switch>
    <Route path="/master" component={Master} />
    <Route path="/story" component={Story} />
    <Route path="/tryout" component={Tryout} />
    <Route path="/" component={Home} />
  </Switch>;
}
