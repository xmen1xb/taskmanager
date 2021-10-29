import "./App.css";
import "./asset/css/search.css";
import { Switch, Link, Route } from "react-router-dom";
import Todolist from "./Components/TodoList";
import Addtask from "./Components/AddTask";
import { Component } from "react";
import { listtasks } from "./Components/listtask";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            backgroundColor: "rgb(47, 138, 47)",
            minHeight: "26px",
            borderEndEndRadius: "7px",
          }}
        >
          <Link exact to="/">
            View List Task
          </Link>
        </div>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            backgroundColor: "rgb(47, 138, 47)",
            minHeight: "26px",
            borderEndStartRadius: "7px",
          }}
        >
          <Link exact to="/addnewtask">
            Add New Task
          </Link>
        </div>
        <span style={{ position: "absolute", left: "200px", top: "0" }}>
          {" "}
          <button
            onClick={() => {
              localStorage.setItem("listtask", JSON.stringify(listtasks));
            }}
          >
            Quick Add Task to Testing
          </button>
        </span>

        <Switch>
          <Route path="/" component={Todolist} exact={true} />
          <Route path="/addnewtask" component={Addtask} exact={true} />
        </Switch>
      </div>
    );
  }
}

export default App;
