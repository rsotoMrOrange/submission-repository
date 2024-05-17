import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box marginBottom={2}>
      <div style={hiddenWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </Box>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
