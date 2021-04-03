import classNames from "classnames"
import PropTypes from "prop-types"
import React, { Component } from "react"
import styles from "./message.module.css"

export class Message extends Component {
  static propTypes = {
    message: PropTypes.shape({
      author: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }

  render() {
    const {
      message: { value, author },
    } = this.props

    return (
      <div
        className={classNames(styles.message, {
          [styles.currentMessage]: author === "User",
        })}
      >
        <h3>{value}</h3>
        <p>{author}</p>
        {/* @TODO use date-fns */}
        <p>12.03</p>
      </div>
    )
  }
}
