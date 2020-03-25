import React, { Component } from "react";
import { Form, Modal, Button, Select } from "semantic-ui-react";

class Add extends Component {
  initialState = {
    form: {
      name: "",
      room: "",
      grade: ""
    }
  };

  state = this.initialState;

  handleChange = (e, select) => {
    const { name, value, textContent } = e.target;
    if (!textContent) {
      this.setState({
        form: { ...this.state.form, [name]: value }
      });
    } else {
      this.setState({
        form: { ...this.state.form, [select]: textContent }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, room, grade } = this.state.form;
    const { addRow } = this.props;

    const newUser = {
      name,
      room,
      grade
    };

    addRow(newUser);
    this.setState(this.initialState);
    if (
      localStorage.getItem("users") === "[]" ||
      JSON.parse(localStorage.getItem("users")) === null
    ) {
      const response = JSON.stringify([...this.props.data, this.state.form]);
      localStorage.setItem("users", [response]);
    } else {
      const parse = JSON.parse(localStorage.getItem("users"));
      const response = JSON.stringify([...parse, this.state.form]);
      localStorage.setItem("users", [response]);
    }

    this.props.onClose();
  };

  render() {
    const { name, room, grade } = this.state.form;
    const { isOpen, onClose } = this.props;
    const preDefRooms = [
      { key: 0, value: 0, text: "I" },
      { key: 1, value: 1, text: "II" },
      { key: 2, value: 2, text: "III" }
    ];
    const preDefGrades = [
      { key: 1, value: 1, text: 1 },
      { key: 2, value: 2, text: 2 },
      { key: 3, value: 3, text: 3 },
      { key: 4, value: 4, text: 4 },
      { key: 5, value: 5, text: 5 },
      { key: 6, value: 6, text: 6 }
    ];

    return (
      <Modal
        trigger={
          <Button content="Add New User" onClick={() => this.props.onOpen()} />
        }
        open={isOpen}
        onClose={onClose}
        closeIcon
      >
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Name"
                placeholder="Name and surname"
                name="name"
                value={name}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="room">Room</label>
              <Select
                placeholder="Room"
                options={preDefRooms}
                onChange={e => this.handleChange(e, "room")}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="grade">Grade</label>
              <Select
                placeholder="Grade"
                options={preDefGrades}
                onChange={e => this.handleChange(e, "grade")}
              />
            </Form.Field>

            <Button
              type="submit"
              content="Submit"
              disabled={!name || !room || !grade}
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Add;
