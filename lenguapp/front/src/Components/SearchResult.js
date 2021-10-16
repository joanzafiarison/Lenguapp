import React from "react";
import axios from "axios";

export default class SearchResults extends React.Component {

  state = {
    users: [],
  };
  componentDidMount() {
    axios.get("http://localhost:5000/users").then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {
    const { users } = this.state;
   
    return (
        <ul className="users">
          {users.map((user) => (
            <li  key={user._id.toString()} className="user">
              <p>
                <strong>Name:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </li>
          ))}
        </ul>
    );
  }
}