import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  return (
    <Router>
      <main>
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/' component={HomeScreen} exact />
        <Route path='/home/:postId' component={HomeScreen} exact />
        <Route path='/profile/:id' component={ProfileScreen} exact />
      </main>
    </Router>
  );
}

export default App;
