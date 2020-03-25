import React, { Component } from "react";
import { Form, Modal, Button, Select } from "semantic-ui-react";

class Edit extends Component {
  initialState = {
    form: {
      name: "",
      room: "",
      grade: ""
    }
  };

  state = this.initialState;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      const user = this.props.getUserById(this.props.id);

      this.setState({
        form: {
          name: user.name,
          room: user.room,
          grade: user.grade
        }
      });
    }
  }

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
    const { updateRow } = this.props;

    const updatedUser = {
      name,
      room,
      grade
    };

    updateRow(this.props.id, updatedUser);

    Promise.resolve().then(_ =>
      localStorage.setItem("users", JSON.stringify(this.props.data))
    );

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
      <Modal open={isOpen} onClose={onClose} closeIcon>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="room">Room</label>
              <Select
                placeholder={room}
                options={preDefRooms}
                onChange={e => this.handleChange(e, "room")}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="grade">Grade</label>
              <Select
                placeholder={grade}
                options={preDefGrades}
                onChange={e => this.handleChange(e, "grade")}
              />
            </Form.Field>
            <Button type="submit" content="Submit" />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Edit;
