import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Paper, ButtonBase, Typography, Button } from '@mui/material';
import { Call as CallIcon } from '@mui/icons-material';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid({ firstName, lastName, email, contactNumber }) {
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img
              alt='complex'
              src='https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'
              className='img-thumbnail'
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                Property By
              </Typography>
              <Typography variant='body2' gutterBottom>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {email}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='outlined' size='medium' startIcon={<CallIcon />}>
                Contact Seller
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
