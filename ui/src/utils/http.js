  function geyQueryString(data) {
    if (!data) { return ''; }

    var queryString = '?', first = true;
    for(var key in data) {
      if (first) {
        first = false;
      } else {
        queryString += '&';
      }
      queryString += key + '=' + data[key];
    }
    return queryString;
  }

  function getHttpRequest(url, method, data) {
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    data = JSON.stringify(data);
    let options = {
      method: method,
      body: data
    };

    return fetch(url, options).then((response) => {
      return response.json()
    })
  }

  var $http = {
    get: function(url, data) {
      url = url + geyQueryString(data);
      return fetch(url).then((response) => {
        return response.json()
      });
    },
    post: function(url, data) {
      return getHttpRequest(url, 'POST', data);
    },
    put: function(url, data) {
      return getHttpRequest(url, 'PUT', data);
    },
    remove: function(url, data) {
      return getHttpRequest(url, 'DELETE', data);
    }
  };

export default $http;
