import React from 'react';

import { useAuth } from '@Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import auth from '@Redux/Auth';

function Logout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logoutHandler = async () => {
    dispatch(auth.actions.logout())
    navigate('/')
  }

  React.useEffect(() => {
    logoutHandler()
  }, [])

  return (
    <>
    </>
  )
}

export default Logout