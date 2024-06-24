import React from 'react';

import styles from './Logout.module.scss'
import { useAuth } from '@Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function logoutHandler() {
      await logout();
      navigate('/')
    }
    logoutHandler()
  }, [])

  return (
    <>
    </>
  )
}

export default Logout