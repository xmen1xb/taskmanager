import "./App.css";
import { Switch, NavLink, Route } from "react-router-dom";
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
          <NavLink style={{}} exact to="/">
            View List Task
          </NavLink>
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
          <NavLink exact to="/addnewtask">
            Add New Task
          </NavLink>
        </div>
        <span style={{ position: "absolute", left: "215px", top: "0" }}>
          {" "}
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              height: "20px",
              borderRadius: "4px",
            }}
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
