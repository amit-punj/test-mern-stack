import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState([]);
  // var data = [];


  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        console.log('response _content', response.data.data)
        setContent(response.data.data);
        // var data = response.data.data.map((val, key) => {
        //   return (
        //     <tr key={key}>
        //       <td>{val._id}</td>
        //       <td>{val.username}</td>
        //       <td>{val.email}</td>
        //     </tr>
        //   )
        // })
        // console.log('data', data)
      },
      (error) => {
        const _content =
          (error.response && error.response.data.data) ||
          error.message ||
          error.toString();
        console.log('_content', _content)
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Username</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              {content.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val._id}</td>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </header>
    </div>
  );
};

export default Home;
