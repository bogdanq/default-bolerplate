import classNames from "classnames"
// import { format } from "date-fns"
import React, { Component } from "react"
import styles from "./message.module.css"

export class Message extends Component {
  render() {
    const {
      // @TODO пофиксить дату
      message: { message, author },
    } = this.props

    return (
      <div
        className={classNames(styles.message, {
          [styles.currentMessage]: author === "User",
        })}
      >
        <p>{author}</p>
        <h3>{message}</h3>
        {/* <p>{format(createdTs, "HH:mm:ss")}</p> */}
      </div>
    )
  }
}
