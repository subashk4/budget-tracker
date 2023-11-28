import React from 'react';
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge } from '@mui/material';
// import { NotificationsIcon, ChatBubbleIcon } from '@mui/icons-material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container>
          <Grid item>
            <InputBase />
          </Grid>
          <Grid sm />
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsNoneIcon color='action' />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color='primary'>
                <ChatBubbleIcon color='action' />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
