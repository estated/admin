import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';

function LeftNav(props) {
  return (
    <Drawer
      open={props.open}
      anchor="left"
      onClose={props.state(false)}
      >
      <div
        tabIndex={0}
        role="button"
        // onClick={props.state(false)}
        // onKeyDown={props.state(false)}
      >
        {props.children}
      </div>
    </Drawer>
  );
}

LeftNav.propTypes = {
  open: PropTypes.bool.isRequired,
  state: PropTypes.func.isRequired,
};

export default LeftNav;