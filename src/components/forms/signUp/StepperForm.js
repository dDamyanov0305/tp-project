import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BasicInfo from './BasicInfo';
import AddressForm from './AddressForm';
import AvatarForm from './AvatarForm';


const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 8,
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});


const steps = ['Email and Password', 'Choose Avatar', 'Shipping Address'];


class StepperForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeStep: 0,
    };
  } 

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInfo handleChange={this.props.handleChange} state={this.props.state}/>;
      case 1:
        return <AvatarForm handleChange={this.props.handleChange} state={this.props.state}/>;
      case 2:
        return <AddressForm handleChange={this.props.handleChange} state={this.props.state}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = (e) => {
    e.preventDefault();

    this.setState(state => {

      if(state.activeStep===steps.length-1){
        this.props.handleSubmit(e);
      }

      return {activeStep: state.activeStep + 1};

    });

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };


  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Sign Up
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    You have successfully signed on our platform.
                  </Typography>
                  <Typography variant="subtitle1">
                    A conformation email has been sent to you. In order to
                    use our srvices, please confirm your personal information.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
    );
  }
}

StepperForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepperForm);