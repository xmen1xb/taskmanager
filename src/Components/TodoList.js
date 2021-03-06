import React, { Component } from "react";

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opentask: null,
      listdel: [],
      listtask: localStorage.getItem("listtask")
        ? JSON.parse(localStorage.getItem("listtask"))
        : [],
      listtaskfilter: [],
      title: "",
      description: "",
      duedate: "",
      piority: "",
      search: "",
    };
  }
  /**
   * Hàm xử lý khi nhập dữ liệu vào để update Task
   */
  handleChange = (event) => {
    if (
      event.target.name === "duedate" &&
      new Date(event.target.value).getTime() <
        new Date(this.state.duedate).getTime()
    ) {
      alert("Please choose the Date in the future !");
      return;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  /**
   * Hàm xử lý xoá Task
   */
  deleteTask = (id) => {
    console.log(id);
    const listtask = localStorage.getItem("listtask")
      ? JSON.parse(localStorage.getItem("listtask"))
      : [];
    listtask.splice(id, 1);
    localStorage.setItem("listtask", JSON.stringify(listtask));
    setTimeout(() => {
      this.setState({
        listtask: listtask,
        opentask: null,
      });
    }, 500);
  };
  /**
   * Hàm xử lý xoá nhiều Task
   */
  deleteMultilTask = () => {
    let listdel = this.state.listdel;
    const listtask = localStorage.getItem("listtask")
      ? JSON.parse(localStorage.getItem("listtask"))
      : [];
    listdel.forEach((element) => {
      let indexfind = listtask.findIndex((e) => e.title === element.title);
      if (indexfind !== -1) {
        listtask.splice(indexfind, 1);
      }
    });
    localStorage.setItem("listtask", JSON.stringify(listtask));
    setTimeout(() => {
      this.setState({
        listtask: listtask,
        listdel: [],
        opentask: null,
      });
    }, 500);
  };
  /**
   * Hàm xử lý update Task
   */
  updatetask = (index) => {
    console.log(index);
    const task = {
      title: this.state.title,
      description: this.state.description,
      duedate: this.state.duedate,
      piority: this.state.piority,
    };
    console.log(task);
    const listtask = localStorage.getItem("listtask")
      ? JSON.parse(localStorage.getItem("listtask"))
      : [];
    listtask.splice(index, 1, task);
    localStorage.setItem("listtask", JSON.stringify(listtask));
    setTimeout(() => {
      alert("Update Success !");
      this.setState({
        listtask: listtask,
      });
    }, 500);
  };
  /**
   * Hàm xử lý tìm kiếm Task theo Title
   */
  handleSearch = (e) => {
    const search = this.state.search;
    const listtask = this.state.listtask;
    console.log(listtask);
    const listtaskfilter = this.state.listtaskfilter;
    for (let index = 0; index < listtask.length; index++) {
      let title = listtask[index].title;
      if (
        title
          .replace(/\s/g, "")
          .toLowerCase()
          .includes(search.replace(/\s/g, "").toLowerCase())
      ) {
        if (!listtaskfilter.includes(listtask[index])) {
          listtaskfilter.push(listtask[index]);
        }
      } else {
        if (listtaskfilter.includes(listtask[index])) {
          let indexfind = listtaskfilter.findIndex(
            (element) => element === listtask[index]
          );
          listtaskfilter.splice(indexfind, 1);
        }
      }
    }
    this.setState({ listtaskfilter: listtaskfilter });
  };
  render() {
    console.log(this.state.listtaskfilter);
    console.log(this.state.listdel);
    const listtaskfilter = this.state.listtaskfilter;
    const rows = this.state.listtask.map((row, index) => {
      console.log(listtaskfilter.length, listtaskfilter.includes(row));
      return (
        <div
          className="taskelement"
          key={index}
          /**
           * Xử lý tìm kiếm khi search nhập vào là rỗng hoặc những task không nằm trong diện được tìm kiếm sẽ display:none
           */
          style={{
            display:
              this.state.search === "" || listtaskfilter.includes(row)
                ? ""
                : "none",
          }}
        >
          <div style={{ borderBottom: "1px solid black" }}>
            <label className="checkboxcontainer">
              <span>{row.title}</span>
              <input
                type="checkbox"
                /**
                 * Xử lý việc check Task
                 */
                checked={
                  this.state.listdel.findIndex(
                    (element) => element.title === row.title
                  ) !== -1
                }
                name={"check" + index}
                value={JSON.stringify(row)}
                /**
                 * Hàm xử lý khi nhấn vào nút Checkbox Task
                 */
                onChange={(event) => {
                  let listdel = this.state.listdel;
                  if (event.target.checked === true) {
                    listdel.push(JSON.parse(event.target.value));
                    this.setState({ listdel: listdel });
                  } else {
                    let indexfind = listdel.findIndex(
                      (element) => element.title === row.title
                    );
                    if (indexfind !== -1) {
                      listdel.splice(indexfind, 1);
                      this.setState({ listdel: listdel });
                    }
                  }
                }}
              />
              <span className="checkmark"></span>
            </label>
            <span className="taskbuttons">
              <button
                className="detailbutton"
                /**
                 * Xử lý khi nhấn vào nút Detail sẽ hiện ra cửa sổ để Update Task
                 */
                onClick={() =>
                  this.state.opentask !== index
                    ? this.setState({
                        opentask: index,
                        title: row.title,
                        description: row.description,
                        duedate: row.duedate,
                        piority: row.piority,
                      })
                    : this.setState({
                        opentask: null,
                        title: "",
                        description: "",
                        duedate: "",
                        piority: "",
                      })
                }
              >
                Detail
              </button>
              <button
                className="removebutton"
                onClick={() => this.deleteTask(index)}
              >
                Remove
              </button>
            </span>
          </div>

          {/* Phần Update Task */}

          <div
            className="bodyupdatetask"
            style={{ display: this.state.opentask === index ? "" : "none" }}
          >
            <div style={{ position: "relative" }}>
              <input
                className="inputupdatetask"
                type="text"
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
              <div className="pioritynupdateduedate">
                <div className="duedateupdate">
                  <p>
                    <label>Due Date</label>
                  </p>
                  <div>
                    <input
                      name="duedate"
                      value={this.state.duedate}
                      onChange={this.handleChange}
                      type="date"
                    />
                  </div>
                </div>
                <div className="piorityupdate">
                  <p>
                    <label>Piority</label>
                  </p>
                  <div>
                    <select
                      key={index}
                      name="piority"
                      value={this.state.piority}
                      onChange={this.handleChange}
                    >
                      <option value="low" key={index + "a"}>
                        Low
                      </option>
                      <option value="normal" key={index + "b"}>
                        Normal
                      </option>
                      <option value="high" key={index + "c"}>
                        High
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="addbutton"
                onClick={() => {
                  this.updatetask(index);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Todo List</h1>
        <div className="todolistbody">
          <div>
            <input
              className="inputsearch"
              type="text"
              placeholder="Search ..."
              onKeyUp={this.handleSearch}
              value={this.state.search}
              onChange={(e) => {
                this.setState({
                  search: e.target.value,
                });
              }}
            />
          </div>

          {rows}
        </div>
        <div
          className="bulkactionwraper"
          style={{ display: this.state.listdel.length === 0 ? "none" : "" }}
        >
          <div className="bulkaction">
            <span className="checkboxcontainer">Bulk Action</span>

            <span className="taskbuttons">
              <button className="detailbutton">Done</button>
              <button className="removebutton" onClick={this.deleteMultilTask}>
                Remove
              </button>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Todolist;
