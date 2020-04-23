import { Router } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GAnalyticsHelper } from '../../../helpers/GAnalyticsHelper';
import { setLoading } from '../../../store/actions/ui.action';

export const RouterEventsWatcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // lets watch the router for every page change and trigger a page view appropriately
    Router.events.on("routeChangeComplete", async () => {
      GAnalyticsHelper.logPageView();
      await dispatch(setLoading(false, "loadingRequest")); // stop all loading requests
    });

    Router.events.on("routeChangeStart", async () => {
      await dispatch(setLoading(true, "loadingRequest"));
    });
  }, []);

  return null;
};
