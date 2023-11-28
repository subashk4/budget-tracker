import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Link, Menu, MenuItem, IconButton } from '@mui/material';

import { Menu as MenuIcon, House as HomeIcon, AccountCircle } from '@mui/icons-material';
import AddPropertyBtn from '../components/button/AddProperty';
import { links } from '../constants/links';
import { utils } from '../utils/fetch';

import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/user';
import { useNavigate } from 'react-router';

export default function Navbar() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === '/login' || pathname === '/signup' || pathname === '/property/addProperty') {
      setHide(true);
    }

    // populate user state
    utils.fetchData('/api/user/profile').then((response) => {
      const { _id: id, firstName, lastName, userType } = response;
      dispatch(setUser({ id, firstName, lastName, userType }));

      // if userType is buyer, we hide add property button
      if (userType === 'buyer') {
        setHideBtn(true);
      }
    });
  }, [dispatch, hideBtn]);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    // localStorage.setItem('accessTkn', null);
    localStorage.removeItem('accessTkn');
    navigate('/login');
  };

  return (
    <>
      <AppBar sx={{ display: `${hide && 'none'}` }}>
        <Toolbar>
          <HomeIcon />
          <CustomLink
            variant='h6'
            sx={{ mr: '1rem' }}
            color='#fff'
            underline='none'
            href='/dashboard'
          >
            Real Estate App
          </CustomLink>
          <NavList>
            {links.map((link) => {
              if (link.toLowerCase().trim().includes('add property')) {
                return (
                  <CustomLink
                    key={link}
                    component='a'
                    href={`/property/${link.split(' ').join('')}`}
                    color='#fff'
                    underline='none'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {link}
                  </CustomLink>
                );
              }

              return (
                <CustomLink
                  key={link}
                  href={`/${link}`}
                  color='#fff'
                  underline='none'
                  sx={{ textTransform: 'capitalize' }}
                >
                  {link}
                </CustomLink>
              );
            })}
            <AddPropertyBtn label='add property' to='/property/addProperty' hide={hideBtn} />
          </NavList>
          {auth && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

const NavList = styled('ul')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  flex-grow: 1;
  margin-top: 1rem;
  padding: 2px;
`;

const CustomLink = styled(Link)`
  :hover {
    color: #fff;
  }
`;
