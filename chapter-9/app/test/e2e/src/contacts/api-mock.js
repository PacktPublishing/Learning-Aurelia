import http from 'http';

export function resetApi() {
  const deferred = protractor.promise.defer();

  const request = http.request({
    protocol: 'http:',
    host: '127.0.0.1',
    port: 8000,
    path: '/reset',
    method: 'POST'
  }, response => {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      deferred.reject(response);
    } else {
      deferred.fulfill();
    }
  });
  request.end();

  return deferred.promise;
}
