import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  margin: {
    width: '100%'
  },
  input: {
    backgroundColor: theme.palette.secondary.light,
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
    <FormControl className={classes.margin}>
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