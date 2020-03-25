import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container } from "semantic-ui-react";
import Add from "./components/Add";
import View from "./components/View";
import "./styles.css";

class App extends Component {
  initialState = {
    users: [
      { name: "Tania Floppydiskette", room: "IIIB", grade: 4 },
      { name: "Timm Zeitgeist", room: "IIIB", grade: 3 },
      { name: "Craig Siliconeidolon", room: "IVA", grade: 2 }
    ],
    results: [],
    query: "",
    isOpen: false,
    isSelected: false,
    selected: [
      { name: "Tania Floppydiskette", room: "IIIB", grade: 4 },
      { name: "Timm Zeitgeist", room: "IIIB", grade: 3 },
      { name: "Craig Siliconeidolon", room: "IVA", grade: 2 }
    ],
    avg: ""
  };

  state = this.initialState;

  componentWillMount() {
    localStorage.getItem("users") &&
      this.setState(
        {
          users: JSON.parse(localStorage.getItem("users"))
        },
        () => {
          this.getAVG();
        }
      );
  }
  componentDidMount() {
    if (
      localStorage.getItem("users") === "[]" ||
      JSON.parse(localStorage.getItem("users")) === null
    ) {
      console.log(
        "%c🚀 🚀 🚀 Using data from initialState",
        "color: orangered"
      );
      this.setState(
        {
          users: this.initialState.users,
          selected: [...this.state.users]
        },
        () => {
          this.getAVG();
        }
      );
    } else {
      console.log(
        "%c🚀 🚀 🚀 Using data from localStorage",
        "color: greenyellow"
      );
      this.setState(
        {
          selected: [...this.state.users]
        },
        () => {
          this.getAVG();
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      this.setState(
        {
          selected: [...this.state.users]
        },
        () => {
          this.getAVG();
        }
      );
    }
  }

  getAVG = () => {
    let data = "";
    data = this.state.selected.map(user => {
      return user.grade;
    });
    const sum = data.reduce((a, b) => Number(a) + Number(b), 0);
    const avg = sum / data.length;

    return this.setState({ avg });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  search = event => {
    const { users } = this.state;
    const { value } = event.target;

    this.setState({ query: value });

    const results = users.filter(user => {
      const regex = new RegExp(value, "gi");
      return user.name.match(regex);
    });

    this.setState({ results });
  };

  resetSearch = () => {
    const { users, query } = this.state;

    const results = users.filter(user => {
      const regex = new RegExp(query, "gi");
      return user.name.match(regex);
    });

    this.setState({ results });
  };

  getUserById = id => {
    const { users } = this.state;

    const u = users.filter(user => user.name === id);

    return u[0];
  };

  addRow = user => {
    const { users } = this.state;

    this.setState({ users: [...users, user] });
  };

  updateRow = (id, updatedUser) => {
    const { users } = this.state;

    this.setState({
      users: users.map(user => (user.name === id ? updatedUser : user))
    });
  };

  deleteRow = id => {
    const { users, selected } = this.state;

    Promise.resolve().then(_ =>
      localStorage.setItem("users", JSON.stringify(this.state.users))
    );

    this.setState({
      users: users.filter(user => user.name !== id),
      selected: selected.filter(user => user.name !== id)
    });
  };
  handleSelect = res => {
    this.setState({
      selected: res,
      isSelected: true
    });
  };
  here = () => {
    this.getAVG();
  };

  render() {
    const { users, results, query, isSelected, selected } = this.state;
    const data = results.length === 0 && !query ? users : results;

    return (
      <Container className="main">
        <Add
          data={this.state.users}
          addRow={this.addRow}
          onClose={this.onClose}
          onOpen={this.onOpen}
          isOpen={this.state.isOpen}
        />
        <View
          data={data}
          isSelected={isSelected}
          selected={selected}
          deleteRow={this.deleteRow}
          updateRow={this.updateRow}
          getUserById={this.getUserById}
          handleSelect={this.handleSelect}
          getHere={this.here}
        />
        <h3>AVG: {this.state.avg}</h3>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
