import React, { Component } from "react"
import styles from "./layout.module.css"

export class Layout extends Component {
  render() {
    const { header, chats, children } = this.props

    return (
      <div className={styles.body}>
        <div className={styles.header}>{header}</div>

        <div className={styles.content}>
          <div className={styles.chats}>{chats}</div>
          <div className={styles.messages}>{children}</div>
        </div>
      </div>
    )
  }
}
