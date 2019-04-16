import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ItemCard from './ItemCard';
import Grow from '@material-ui/core/Grow';
import { Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {   
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      marginTop: 56,
    },
    gridList: {
      width: '60%',
      height: '100%',
    },
    sideGrid:{
      backgroundColor: theme.palette.background.paper,
    }
  });

const cols=3;

const Body = props =>{
    const { classes, user, items } = props;
    return(
        <div className={classes.root}>
        <Grid direction="column" container className={classes.sideGrid}>
          <Grid item>
            <Typography>

            </Typography>
          </Grid>
        </Grid>
        <GridList cellHeight={"auto"} className={classes.gridList} cols={cols}>
            {items.map((item,index)=>(
              <Grow in timeout={500*(index%cols+1)} key={index}>
                <GridListTile cols={1}>
                    <ItemCard item={item} user={user}/>
                </GridListTile>
              </Grow>
            ))}
        </GridList>
      </div>
    );
}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme : true})(Body);
