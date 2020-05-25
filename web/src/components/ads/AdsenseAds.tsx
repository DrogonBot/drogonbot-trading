import { useEffect } from 'react';
import AdSense from 'react-adsense';
import styled from 'styled-components';

import { appEnv, ENV } from '../../constants/Env.constant';
import { colors } from '../../constants/UI/Colors.constant';
import { AdsenseAdsTypes } from '../../types/Ads.types';
import { EnvironmentTypes } from '../../types/Global.types';

export class AdsenseHelper {
  public static showAds = (
    type: AdsenseAdsTypes,
    customStyles?: Object,
    layoutKey?: string
  ) => {
    useEffect(() => {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    if (ENV === EnvironmentTypes.Development) {
      return (
        <DevelopmentAdsContainer style={customStyles}>
          <span>Ads are not displayed in Development mode!</span>
        </DevelopmentAdsContainer>
      );
    }

    switch (type) {
      case AdsenseAdsTypes.ResponsiveAndNative:
        return (
          <AdSense.Google
            client={appEnv.adsense.adClient}
            slot={appEnv.adsense.adSlot}
            style={{ display: "block", minWidth: 251 }}
            layout="in-article"
            format="fluid"
          />
        );
      case AdsenseAdsTypes.NoSetup:
        return (
          <AdSense.Google
            client={appEnv.adsense.adClient}
            slot={appEnv.adsense.adSlot}
          />
        );
      case AdsenseAdsTypes.CustomFormat:
        return (
          <AdSense.Google
            client={appEnv.adsense.adClient}
            slot={appEnv.adsense.adSlot}
            style={customStyles}
            format=""
          />
        );
      case AdsenseAdsTypes.FullWith:
        return (
          <AdSense.Google
            client={appEnv.adsense.adClient}
            slot={appEnv.adsense.adSlot}
            style={{ display: "block" }}
            format="auto"
            responsive="true"
            layoutKey={layoutKey}
          />
        );
    }
  };
}

const DevelopmentAdsContainer = styled.div`
  width: 100%;
  height: 150px;
  border: 0.5rem solid ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
