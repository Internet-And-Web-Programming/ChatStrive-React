import React from "react";
import "./Chat.css";
import MainUser from "./contactDetails";
// Socket establishment
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4500/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function changeActive(Connections) {
  console.log("calling :", Connections);
}

// Chat page
function Chat() {
  return (
    <>
      <section id="main">
        <article>
          <section>
            <header>
              <table>
                <tr>
                  <td>
                    <div className="profilePic">
                      <img src={MainUser.User.avatar} alt="" height="40px" />
                    </div>
                  </td>
                  <td>
                    <div className="Username">
                      <p>{MainUser.User.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className="addNew">
                      <a href="/ChattingPageNew.html">
                        <i className="fas fa-comment-dots"></i>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <div className="searchUser">
                      <form action="#Search">
                        <i
                          className="fa fa-search"
                          aria-hidden="true"
                          id="SearchLogo"
                        ></i>
                        <input type="text" name="search" placeholder="Search" />
                      </form>
                    </div>
                  </td>
                </tr>
              </table>
            </header>
            <main>
              <div className="Connections">
                {MainUser.Connections.map((Connections) => (
                  <button className="btn" onClick={changeActive(Connections)}>
                    <div className="Card" id="SampleUserName1">
                      <div className="profilePic">
                        <img
                          src={Connections.profilePic}
                          alt=""
                          height="40px"
                        />
                      </div>
                      <div className="Username">
                        <p>{Connections.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </main>
          </section>
        </article>
        <aside>
          <section>
            <header>
              {MainUser.Active.map((Active) => (
                <div className="Card">
                  <div className="profilePic">
                    <img src={Active.profilePic} alt="" height="40px" />
                  </div>
                  <div className="Username" id="ActiveUser">
                    <p>{Active.name}</p>
                  </div>
                </div>
              ))}
            </header>
            <main>
              <div className="messageWindow"></div>
            </main>
            <footer>
              <div className="messageInput">
                <form action="" autocomplete="off">
                  <input type="text" name="message" placeholder="Message" />
                  <button id="reply" type="Submit">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </footer>
          </section>
        </aside>
      </section>
    </>
  );
}

export default Chat;
