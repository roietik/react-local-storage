import React, { Component } from "react";
import { Table, Button, Select } from "semantic-ui-react";
import Edit from "./Edit.js";

class View extends Component {
  state = {
    isOpen: false,
    id: ""
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  onOpen = () => {
    this.setState({ isOpen: true, id: this.props.id });
  };

  getRooms = () => {
    const data = this.props.data.map(row => row.room);
    const filtered = data.filter((v, i) => data.indexOf(v) === i);
    const options = filtered.map((item, idx) => {
      return { key: idx, value: idx, text: item };
    });
    const res = [
      ...options,
      { key: filtered.length, value: filtered.length, text: "ALL" }
    ];
    return res.reverse();
  };
  roomFilter = e => {
    let room = e.target.textContent;
    let selected = [];
    this.props.data.map(row => {
      if (row.room === room) {
        selected = [...selected, row];
      }
      if (room === "ALL") {
        selected = [...this.props.data];
      }

      this.props.handleSelect(selected);
      // setTimeout(() => this.props.getHere(), 200);
      Promise.resolve().then(_ => this.props.getHere());
      // this.props.getHere();

      return selected;
    });
  };

  render() {
    const { isOpen, id } = this.state;
    const {
      isSelected,
      selected,
      data,
      deleteRow,
      updateRow,
      getUserById
    } = this.props;

    return (
      <div>
        <Edit
          data={data}
          onClose={this.onClose}
          isOpen={isOpen}
          id={id}
          updateRow={updateRow}
          getUserById={getUserById}
        />
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>
                <Select
                  placeholder="Room"
                  options={this.getRooms()}
                  onChange={this.roomFilter}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Grade</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(isSelected ? selected : data).map(row => (
              <Table.Row key={row.name}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.room}</Table.Cell>
                <Table.Cell>{row.grade}</Table.Cell>
                <Table.Cell>
                  <Button
                    content="Edit"
                    onClick={() => {
                      this.setState({ isOpen: true, id: row.name });
                    }}
                  />
                  <Button
                    content="Delete"
                    onClick={() => {
                      deleteRow(row.name);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default View;
