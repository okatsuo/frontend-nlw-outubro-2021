import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth/index'



export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext)

  console.log(user)
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted style={{ fontSize: '30px' }} />
        Entrar com GitHUB
      </a>
    </div>
  )
}