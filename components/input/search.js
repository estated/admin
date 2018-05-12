import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Search from '@material-ui/icons/Search';

const styles = () => ({
  form: {
    width: '100%'
  },
  input: {
    padding: '8px',
    width: '100%'
  },
  search: {
    width: '100%'
  }
});

function InputWithIcon(props) {
  const { classes } = props;

  return (
    <FormControl className={classes.form}>
      <Input
        className={classes.input}
        onChange={props.action}
        startAdornment={
          <InputAdornment position="start">
            <Search fluid='true' />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func,
};

export default withStyles(styles)(InputWithIcon);