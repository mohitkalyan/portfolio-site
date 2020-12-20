import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Navigation from '../Navigation';
import PageUtils from '../PageUtils';
import Toggle from '../Toggle';
import { useContext } from '../../context';

import styles from './header.module.css';
import MenuIcon from '../../icons/menu.svg';
import CloseIcon from '../../icons/close_icon.svg';

const Header = ({ className, isClose, onClick }) => {
  const dispatch = useContext()[1];

  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "avatar.png" }) {
        childImageSharp {
          gatsbyImageData(width: 40, height: 40, layout: FIXED)
        }
      }
    }
  `);

  return (
    <>
      <header className={`${styles.header} ${className || ''}`}>
        <div className={styles.container}>
          <div className={styles.headerLeft}>
            <Link to="/" onClick={onClick || null}>
              <GatsbyImage
                image={data.file.childImageSharp.gatsbyImageData}
                className={styles.avatar}
                style={{ width: '38px', height: '38px' }}
              />
              Adam Collier
            </Link>
            <PageUtils />
          </div>
          <div className={styles.headerRight}>
            <Navigation className={styles.navigation} />
            <Toggle className={styles.toggle} />
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => dispatch({ type: 'isMobileMenu' })}
              onKeyDown={() => dispatch({ type: 'isMobileMenu' })}
              aria-label="menu button"
            >
              {isClose ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
