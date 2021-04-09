import { Modal as ModalBase } from "@material-ui/core"
import classnames from "classnames"
import React from "react"
import { useDispatch } from "react-redux"
import { addConversation } from "../../store"
import styles from "./add-contact-modal.module.css"

const contacts = Array.from({ length: 50 }, (_, i) => `room${i}`)

export const AddContactModal = ({ isOpen, onClose, conversations }) => {
  const dispatch = useDispatch()

  const handleContactClick = (contact) => {
    // @TODO сделать так, что бы нельзя было добавить выбранный контакт
    dispatch(addConversation(contact))
    onClose()
  }

  const checkActiveConversation = (contact) => {
    return conversations.find((conversation) => conversation.title === contact)
  }

  return (
    <ModalBase open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Добавить учасников</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              className={classnames({
                [styles.active]: checkActiveConversation(contact),
              })}
              onClick={() => handleContactClick(contact)}
              key={contact}
            >
              {contact}
            </li>
          ))}
        </ul>
      </div>
    </ModalBase>
  )
}
