import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Clear from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from '@material-ui/core';

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
        backgroundColor: "#10bbd5",
    },
    buttonText:{
        marginLeft:10,
        marginRight:10,
        color:theme.palette.background.paper,
    }
});


const Basket = props =>{

    const { classes, items } = props;

    return(
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>
                            <Button className={classes.button} onClick={props.handleFinalize}>
                                <Typography className={classes.buttonText}>
                                    finalize purchase
                                </Typography>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item,index)=>(
                            <TableRow key={index}>
                                <TableCell><img src={item.url} alt="sum fuk?" className={classes.image}/></TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.author}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell><Fab color="secondary" onClick={()=>{props.handleBasketChange(item,"R")}}><Clear/></Fab></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

Basket.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles,{withTheme:true})(Basket);
