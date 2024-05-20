import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Avatar, Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import DashboardIcon from '../Icons/index';

// import { useProfile } from '@/providers/ProfileProvider';

const { Text, Title } = Typography;

const SideBar = () => {
  const location = useLocation();

  const checkIfPathActive = (path: string) => {
    if (location.pathname.startsWith(path)) {
      return {
        class: styles['a--active'],
        isActive: true,
      };
    }

    return {
      class: '',
      isActive: false,
    };
  };

  return (
    <nav className={styles['side-bar']}>
      {/* <div
        className={styles['side-bar__section']}
        style={{ overflowY: 'scroll' }}
      ></div> */}
      <div className={styles['side-bar__section']}>
        <div className={styles['side-bar__section__company-profile']}>
          <img src="./ham.svg" alt="nav" />
          <div className={styles['side-bar__section__company-profile__info']}>
            <Link to="/">
              {' '}
              <img src="./logo.svg" alt="logo" />
            </Link>
            {/* <img src="./logo.svg" alt="logo" /> */}
          </div>
        </div>
        <div className={styles['side-bar__section__divider']}></div>
        <div className={styles['side-bar__section__actions-container--first']}>
          <ul>
            <li>
              <span>
                <img src="/overview.svg" alt="overview" />
              </span>
              <Link to="" className={checkIfPathActive('/overview').class}>
                {' '}
                Overview
              </Link>
            </li>
            <li>
              <span>
                <img src="/inventory.svg" alt="inventory" />
              </span>

              <Link to="" className={checkIfPathActive('/sales').class}>
                Sales
              </Link>
            </li>
            <li>
              <span>
                <img src="/customers.svg" alt="customers" />
              </span>

              <Link to="" className={checkIfPathActive('/customer').class}>
                Customer
              </Link>
            </li>
            <li>
              <span>
                <img src="/inventory.svg" alt="inventory" />
              </span>

              <Link to="" className={checkIfPathActive('/inventory').class}>
                Inventory
              </Link>
            </li>
            <li>
              <span>
                <img src="/profit.svg" alt="profit" />
              </span>

              <Link to="" className={checkIfPathActive('/profit-loss').class}>
                Profit/loss
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles['side-bar__section__log-out-section']}>
          <div className={styles['side-bar__section__log-out-section__item']}>
            <span>
              <img src="./settings.svg" alt="settings" />
            </span>
            <span className="">Settings</span>
          </div>

          <div className={styles['side-bar__section__log-out-section__item']}>
            <span>
              <img src="./logout.svg" alt="logout" />
            </span>
            <span className="">Log out</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
