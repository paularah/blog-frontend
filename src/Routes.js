import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostList from "./Posts";
import PostView from "./components/PostView";

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={PostList}/>
                <Route path="/posts/:id" exact component={PostView}/>
            </Switch>
        </Router>
    )
}

export default Routes