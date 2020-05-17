

import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tab from './Tabs/Tabs';

    export default function Profile(){

        return (
            <div>
                 <Grid container spacing={5} style={{marginLeft:200,marginTop:50}}>
                          <Grid container item xs={8} spacing={3}>
                              <Tab/>
                          </Grid>
                  </Grid>
            </div>
        );
    }
