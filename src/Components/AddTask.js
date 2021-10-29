import React, { Component } from "react";

class Addtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      duedate: "",
      piority: "normal",
    };
  }
  /**
   * Hàm xử lý khi nhập dữ liệu vào
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  /**
   * Hàm xử lý khi nhấn vào nút Add
   */
  addNewTask = () => {
    const task = {
      title: this.state.title,
      description: this.state.description,
      duedate: this.state.duedate,
      piority: this.state.piority,
    };
    if (
      new Date(Date.now()).getTime() > new Date(this.state.duedate).getTime()
    ) {
      alert("Please choose the Date in the future !");
      return;
    }
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.duedate === "" ||
      this.state.piority === ""
    ) {
      alert("Bạn phải điền đủ tất cả các trường");
      return;
    }

    const listtask = localStorage.getItem("listtask")
      ? JSON.parse(localStorage.getItem("listtask"))
      : [];
    listtask.push(task);
    alert("Add new Task Success !");
    localStorage.setItem("listtask", JSON.stringify(listtask));
    this.props.history.replace("/");
  };
  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>New Task</h1>
        <div className="bodynewtask">
          <div style={{ position: "relative" }}>
            <input
              className="inputnewtask"
              type="text"
              placeholder="Add new task ..."
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <div>
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <textarea
                className="description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="pioritynduedate">
              <div className="duedate">
                <p>
                  <label>Due Date</label>
                </p>
                <div>
                  <input
                    type="date"
                    name="duedate"
                    value={this.state.duedate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="piority">
                <p>
                  <label>Piority</label>
                </p>
                <div>
                  <select
                    defaultValue="normal"
                    name="piority"
                    value={this.state.piority}
                    onChange={this.handleChange}
                  >
                    <option value="low" key="">
                      Low
                    </option>
                    <option value="normal" key="">
                      Normal
                    </option>
                    <option value="high" key="">
                      High
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button className="addbutton" onClick={this.addNewTask}>
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Addtask;
