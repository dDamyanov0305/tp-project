import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Clear from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, IconButton } from '@material-ui/core';
import {root} from '../config/css';

const styles=theme=>({
    root,
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
    }
});


const Basket = props =>{

    const { classes, items } = props;
    const cells=["Book","Title","Author","Price"];
    let total=0;
    let discount=0;

    return(
        <div className={classes.root}>
            <Typography variant='h4' className={classes.type} gutterBottom>
                Basket
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
                            items.map((item,index)=>{
                                total+=item.price;
                                return(
                                <TableRow key={index}>
                                    <TableCell><img src={item.image} alt="sum fuk?" className={classes.image}/></TableCell>
                                    <TableCell>
                                        <Typography variant='overline'>
                                            {item.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='overline'>
                                            {item.author}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='overline' color="secondary">
                                            {item.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color='inherit' onClick={()=>{props.handleBasketChange(item,"R")}}>
                                            <Clear/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )})}
                            <TableRow>
                                <TableCell colSpan={2} rowSpan={4}/>
                                <TableCell>
                                    <Typography variant='button'>
                                        Total worth:
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant='button' >
                                        {total}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='button'>
                                        Discount:
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='button' >
                                        {0}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <Button className={classes.button} onClick={props.handleFinalize}>
                                        <Typography className={classes.buttonText}>
                                            purchase
                                        </Typography>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='button' color='secondary'>
                                        {total-discount}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

Basket.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles,{withTheme:true})(Basket);
