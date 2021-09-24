import React from 'react';
import Script from 'next/script';

import config from '../config.json';
import { AnalyticsProviders } from '../misc/useAnalytics';

export default function Analytics() {
  const { type, id } = config.analytics;

  if (type === AnalyticsProviders.Google) {
    return (
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        />
        <Script strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${id}', { page_path: window.location.pathname });`}
        </Script>
      </>
    );
  }

  if (type === AnalyticsProviders.Simple) {
    return (
      <>
        <Script strategy="lazyOnload">
          {`window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`}
        </Script>
        <Script
          strategy="lazyOnload"
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        />
      </>
    );
  }

  if (type === AnalyticsProviders.Plausible) {
    return (
      <>
        <Script
          strategy="lazyOnload"
          data-domain={id}
          src="https://plausible.io/js/plausible.js"
        />
        <Script strategy="lazyOnload">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </>
    );
  }

  return null;
}
