import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  containerId: string,
  children: React.ReactNode
}

export default function ReactPortal({ containerId, children }:ReactPortalProps) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}

ReactPortal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
