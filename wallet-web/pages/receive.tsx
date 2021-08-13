import { useMediaQuery } from '@material-ui/core'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { useContext } from 'react'
import { Layout, NymCard } from '../components'
import MainNav from '../components/MainNav'
import NoClientError from '../components/NoClientError'
import { ValidatorClientContext } from '../contexts/ValidatorClient'

const Receive = () => {
  const { client } = useContext(ValidatorClientContext)
  const matches = useMediaQuery('(min-width:769px)')

  return (
    <>
      <MainNav />
      <Layout>
        <NymCard title="Receive Nym">
          {!client ? (
            <NoClientError />
          ) : (
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="subtitle1" noWrap={false}>
                  You can receive tokens by providing this address to the sender
                </Typography>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography
                      variant={matches ? 'h5' : 'subtitle1'}
                      style={{ wordBreak: 'break-word' }}
                    >
                      {client?.address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </NymCard>
      </Layout>
    </>
  )
}

export default Receive