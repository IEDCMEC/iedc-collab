import React from 'react';
import './SuspenseLoader.scss';

function SuspenseLoader() {
  return (
    <div className="loader__enwrapper">
      <div className="loader__suspense_container">
        <span className="one spanner" />
        <span className="two spanner" />
        <span className="three spanner" />
        <span className="four spanner" />
      </div>
    </div>
  );
}

export default SuspenseLoader;
