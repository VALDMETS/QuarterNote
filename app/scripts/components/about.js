import React from 'react';

import Header from './header';

export default React.createClass({
  render: function() {
    return (
      <div className="about">
        <Header/>
        <div className="misc-message">
          <h6>About QuarterNote</h6>
          <p>This WebApp is my final project at The Iron Yard coding academy.</p>
          <p>If you have questions, concerns, or want to give me a rad job, feel free to email me at <a href="mailto: benvaldmets@gmail.com">benvaldmets@gmail.com</a></p>
        </div>
      </div>
    )
  }
});
