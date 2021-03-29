import PropTypes from "prop-types"
import React, { Component } from "react"

export class Layout extends Component {
  static propTypes = {
    messages: PropTypes.node.isRequired,
  }

  render() {
    const { messages } = this.props
    return <div>{messages}</div>
  }
}
