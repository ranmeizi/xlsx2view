

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

// var reactRouter = require('react-router')
var reactRouter = require('react-router-cache-route');
var React = _interopDefault(require('react'));

export function matchRoutes(
  routes,
  pathname,
  /*not public API*/
  branch
) {
  if (branch === void 0) {
    branch = [];
  }

  routes.some(function(route) {
    var match = route.path
      ? reactRouter.matchPath(pathname, route)
      : branch.length
      ? branch[branch.length - 1].match // use parent match
      : reactRouter.Router.computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({
        route: route,
        match: match
      });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });
  return branch;
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

export function renderRoutes(routes, extraProps, switchProps) {
  if (extraProps === void 0) {
    extraProps = {};
  }

  if (switchProps === void 0) {
    switchProps = {};
  }

  return routes
    ? React.createElement(
        reactRouter.CacheSwitch,
        switchProps,
        routes.map(function(route, i) {
          return React.createElement(reactRouter.CacheRoute, {
            key: route.key || i,
            path: route.path,
            exact: route.exact,
            strict: route.strict,
            when: route.when,
            cacheKey: route.cacheKey,
            unmount: false,
            behavior: cached =>
              cached ? { style: { display: 'none' } } : undefined,
            render: function render(props) {
              return route.render
                ? route.render(
                    _extends({}, props, extraProps, {
                      route: route
                    })
                  )
                : React.createElement(
                    route.component,
                    _extends({}, props, extraProps, {
                      route: route
                    })
                  );
            }
          });
        })
      )
    : null;
}

// exports.matchRoutes = matchRoutes
// exports.renderRoutes = renderRoutes

// export default { matchRoutes, renderRoutes }
