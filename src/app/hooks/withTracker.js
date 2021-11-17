import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// const location = useLocation();

export default function withTracker(WrappedComponent, options = {}) {
  // const location = useLocation();
  const trackPage = (page) => {
    window.gtag('send', 'page_view', {
      // page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  };

  const HOC = class extends Component {
    componentDidMount() {
      const {
        location: { pathname: page },
      } = this.props;
      trackPage(page);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      const {
        location: {
          pathname: currentPage,
        },
      } = this.props;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}
