import React from 'react';
import { useTheme, Box, Grid, Typography, Paper, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { MainContext } from 'src/context/main';
import { NymLogoSVG } from 'src/icons/NymLogoSVG';

export const Page404: React.FC = () => {
  const history = useHistory();
  const { mode }: any = React.useContext(MainContext);
  const theme = useTheme();
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          // style={{ minHeight: '50vh' }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              sx={{
                p: 3,
                height: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                background:
                  mode === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.primary.light,
                borderRadius: 10,
              }}
            >
              <NymLogoSVG />
              <Typography variant="h2">Oh No!</Typography>
              <Typography variant="body1">
                It looks like you might be lost.
              </Typography>
              <Typography variant="body1" textAlign="center">
                Please try the link again or navigate back to{' '}
              </Typography>
              <Button
                sx={{
                  fontWeight: 'bold',
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                }}
                onClick={() => history.push('/overview')}
              >
                Overview
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
