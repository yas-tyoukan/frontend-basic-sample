import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.less';

const CenteringTemplate = ({ contents, horizontal, vertical }) => (
  <div className={classNames('t_centering-template', { horizontal, vertical })}>
    <div className="contents">{contents}</div>
  </div>
);

CenteringTemplate.propTypes = {
  contents: PropTypes.node,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
};

CenteringTemplate.defaultProps = {
  contents: '',
  horizontal: false,
  vertical: false,
};

export default CenteringTemplate;
