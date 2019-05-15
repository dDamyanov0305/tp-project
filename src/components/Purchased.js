import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import status from '../config/Status';
import {red,green,amber,purple} from '@material-ui/core/colors';

const styles=theme=>({
    root:{
        marginTop:56,
        marginLeft: theme.spacing.unit * 24,
        marginRight: theme.spacing.unit * 24,
        width: 'auto',
        display: 'block',
    },
    image:{
        width:100,
    },
    button:{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    buttonText:{
        marginLeft:10,
        marginRight:10,
        color:theme.palette.background.paper,
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
    status3:{
        color:amber[600]
    },
    status4:{
        color:purple[900]
    }
    
});


const Purchased = props =>{

    const {classes,items}=props;
    const cells=["Book","Title","Uploader","Status"];
    const colors=[null,classes.status1,classes.status2,classes.status3,classes.status4];

    return(
        <div className={classes.root}>
        <Typography variant='h4' className={classes.type} gutterBottom>
            Purchased
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
                                        {e.owner.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='overline' className={colors[3]}>
                                        {status[3]}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>
    </div>
    );

    
}

Purchased.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles,{withTheme:true})(Purchased);
