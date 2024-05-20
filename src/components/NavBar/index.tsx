import React, { useState } from 'react';
import styles from './index.module.scss';
import { Avatar } from 'antd';
// import { AnimatePresence } from 'framer-motion';
// import ActionButton from '../ActionButton';
// import Notifications from '../Notifications';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__container']}>
        <img src="./notif.svg" alt="dropdown" />

        <img src="./Avatar.svg" alt="avatar" />

        <img src="./chevron-down.svg" alt="dropdown" />
      </div>
    </nav>
  );
};

export default NavBar;
