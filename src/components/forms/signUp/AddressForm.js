import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const AddressForm = props => {
  const { state } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={24}>        
        <Grid item xs={12}>
          <TextField
            required
            autoFocus
            id="address1"
            name="addressLine1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={state.addressLine1}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="addressLine2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={state.addressLine2}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={state.city}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth
            value={state.region}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="postalCode"
            name="postalCode"
            label="Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={state.postalCode}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={state.country}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;