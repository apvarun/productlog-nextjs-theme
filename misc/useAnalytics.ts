import config from '../config.json';

export enum AnalyticsProviders {
  Google = 'Google Analytics',
  Simple = 'Simple Analytics',
  Plausible = 'Plausible Analytics',
}

export default function useAnalytics() {
  const { type } = config.analytics;

  let logEvent = (...rest: any) => undefined;

  if (type === AnalyticsProviders.Google) {
    logEvent = (action, category, label, value) => {
      if ('gtag' in window) {
        (window as any).gtag?.('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    };
  }

  if (type === AnalyticsProviders.Google) {
    logEvent = (eventName, callback) => {
      if ('sa_event' in window) {
        if (callback) {
          return (window as any).sa_event?.(eventName, callback);
        } else {
          return (window as any).sa_event?.(eventName);
        }
      }
    };
  }

  if (type === AnalyticsProviders.Plausible) {
    logEvent = (eventName, ...rest) => {
      if ('plausible' in window) {
        return (window as any).plausible?.(eventName, ...rest);
      }
    };
  }

  return { logEvent };
}
