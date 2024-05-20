import NavBar from '../../components/NavBar';
import styles from './index.module.scss';
import React, { FC, ReactNode } from 'react';
import SideBar from '../../components/SideBar';

type ContentLayoutProps = {
  children: ReactNode;
};

const ContentLayout: FC<ContentLayoutProps> = ({ children }) => {
  return (
    <>
      <div className={styles['dashboard-page']}>
        <SideBar />
        <div className={styles['dashboard-page__container']}>
          <NavBar />
          {children}
        </div>
      </div>
    </>
  );
};

export default ContentLayout;
