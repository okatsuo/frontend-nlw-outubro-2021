import styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

type MessageInterface = {
  id: string,
  text: string,
  user: {
    name: string
    avatar_url: string
    login: string
  }
}

export function MessageList() {
  const [messages, setMessages] = useState<MessageInterface[]>([])
  useEffect(() => {
    api.get<MessageInterface[]>('messages/last3')
      .then(({ data }) => setMessages(data))
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="doWhile 2021" />
      <ul className={styles.messageList}>
        {
          messages.map((message) => {
            return (
                <li key={message.id} className={styles.message}>
                  <p className={styles.messageContent}>{message.text}</p>
                  <div className={styles.messageUser}>
                    <div className={styles.userImage}>
                      <img src={message.user.avatar_url} alt={message.user.name} />
                    </div>
                    <span>{message.user.login}</span>
                  </div>
                </li>
            )
          })
        }
      </ul>

    </div>
  )
}