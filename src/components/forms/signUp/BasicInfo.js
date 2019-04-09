import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function BasicInfo(props) {
  const { state } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Info
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            autoFocus
            value={state.firstName}
            onChange={props.handleChange}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={state.lastName}
            onChange={props.handleChange}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={state.email}
            onChange={props.handleChange}
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="enter e-mail"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={state.password}
            onChange={props.handleChange}
            id="password"
            name="password"
            label="Enter password"
            type="password"
            fullWidth
            autoComplete="password"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="confirm"
            name="confirm"
            label="Confirm password"
            type="password"
            fullWidth
            autoComplete="confirm"
          />
        </Grid>
        <Grid item xs={12}/>
      </Grid>
    </React.Fragment>
  );
}

export default BasicInfo;