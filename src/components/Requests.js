import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from '@material-ui/core';
import { db } from '../config/FirebaseConfig'
import {red,green,amber,purple} from '@material-ui/core/colors';
import status from '../config/Status';
import {root} from '../config/css';

const styles=theme=>({
    root,
    image:{
        width:100,
    },
    type:{
        color:'#bdbdbd'
    },
    status1:{
        color:red[500]
    },
    status2:{
        color:green[500]
    },

    
});

const Requests = (props) => {


    const {classes,items}=props;
    const cells=["Book","Title","Buyer"];

    return(
        <div className={classes.root}>
            <Typography variant='h4' className={classes.type} gutterBottom>
                Requests
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {cells.map((e,index)=>(
                                <TableCell key={index}>
                                    <Typography variant='button'>
                                        {e}
                                    </Typography>
                                </TableCell>
                            ))}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            items.map((e,index)=>(
                                <TableRow key={index}>
                                    <TableCell><img src={e.item.image} alt="sum fuk?" className={classes.image}/></TableCell>
                                    <TableCell>
                                        <Typography variant='overline'>
                                            {e.item.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='overline'>
                                            {e.buyer.email}
                                        </Typography>
                                    </TableCell>
                                        {
                                            (e.status===0)?
                                            <TableCell>
                                                <Button onClick={()=>{props.acceptRequest(e)}}>
                                                    <Typography variant='overline' className={classes.status2}>
                                                        Accept
                                                    </Typography>
                                                </Button>
                                                <Button onClick={()=>{props.rejectRequest(e)}}>
                                                    <Typography variant='overline' className={classes.status1}>
                                                        Reject
                                                    </Typography>
                                                </Button>
                                            </TableCell>:
                                            <TableCell>
                                                <Typography variant='overline' >
                                                    {status[e.status]}
                                                </Typography>
                                            </TableCell>
                                        }
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
    


    
}

Requests.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles,{withTheme:true})(Requests);
