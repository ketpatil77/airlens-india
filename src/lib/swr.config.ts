import type { SWRConfiguration } from "swr";

/**
 * U7 — Centralized SWR Config
 * Single source of truth for all SWR hooks. Includes retry logic
 * and offline resilience settings.
 */
export const globalSwrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 300_000, // 5 minutes
  focusThrottleInterval: 300_000,
  refreshInterval: 300_000,
  revalidateIfStale: false,
  errorRetryCount: 3,
  errorRetryInterval: 10_000,
  onErrorRetry: (
    _error,
    _key,
    _config,
    revalidate,
    { retryCount }: { retryCount: number },
  ) => {
    if (retryCount >= 3) return;
    setTimeout(() => revalidate({ retryCount }), 10_000);
  },
};
