import Home from "./pages/Home";
import Master from "./pages/Master";
import { Route, Switch } from "wouter";

export default function App() {
  return <Switch>
    <Route path="/master" component={Master} />
    <Route path="/" component={Home} />
  </Switch>;
}
