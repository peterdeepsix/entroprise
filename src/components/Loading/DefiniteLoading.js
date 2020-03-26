import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

const DefiniteLoading = props => {
  const { progress, loading } = props;
  {
    return (
      <LinearProgress
        variant="determinate"
        value={progress}
        loading={loading}
      ></LinearProgress>
    );
  }
};

export default DefiniteLoading;
