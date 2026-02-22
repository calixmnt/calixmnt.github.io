export function measurePageLoad() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfData) {
      console.group('📊 Performance Metrics');
      console.log('DNS Lookup:', Math.round(perfData.domainLookupEnd - perfData.domainLookupStart), 'ms');
      console.log('TCP Connection:', Math.round(perfData.connectEnd - perfData.connectStart), 'ms');
      console.log('Request Time:', Math.round(perfData.responseStart - perfData.requestStart), 'ms');
      console.log('Response Time:', Math.round(perfData.responseEnd - perfData.responseStart), 'ms');
      console.log('DOM Processing:', Math.round(perfData.domComplete - perfData.domLoading), 'ms');
      console.log('Load Complete:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
      console.groupEnd();
    }

    const resources = performance.getEntriesByType('resource');
    const slowResources = resources
      .filter((r: PerformanceEntry) => (r as PerformanceResourceTiming).duration > 100)
      .sort((a, b) => (b as PerformanceResourceTiming).duration - (a as PerformanceResourceTiming).duration);

    if (slowResources.length > 0) {
      console.group('⚠️ Slow Resources (>100ms)');
      slowResources.forEach((r: PerformanceEntry) => {
        const resource = r as PerformanceResourceTiming;
        console.log(`${Math.round(resource.duration)}ms - ${r.name}`);
      });
      console.groupEnd();
    }
  });
}

export function measureScriptExecution(label: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`⏱️ ${label}: ${Math.round(end - start)}ms`);
}
