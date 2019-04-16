import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: 15
  },
  media: {
    height: 220,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  titleSize:{
    fontSize: '1em',
  },
  subheaderSize:{
    fontSize: '.8em',
  },
  divider:{
    width:1,
    height:100,
    display: 'inline-block',
  }
});

const ItemCard = props =>{

    const { classes, item } = props;
    const avatar = item.uploader.url ? 
      
      (<Avatar aria-label="avatar" src={item.uploader.url}/>) :
      (<Avatar aria-label="avatar" className={classes.avatar}>
        {item.uploader.name.split(" ")[0][0] + item.uploader.name.split(" ")[1][0]}
      </Avatar>);


    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={avatar}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.uploader.name}
          subheader={moment(item.uploaded_at.toDate()).calendar()}
          classes={{
            title:classes.titleSize,
            subheader:classes.subheaderSize,
          }}
        />
        <CardMedia
          className={classes.media}
          image={item.url}
        />
        <CardContent>
          <Grid container spacing={16}>
            <Grid item>
              <Typography component="p" className={classes.text}>
                {item.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="p" className={classes.text}>
                {item.author}
              </Typography>
            </Grid>
          </Grid>
          
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>        
        </CardActions>
      </Card>
    );

}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);