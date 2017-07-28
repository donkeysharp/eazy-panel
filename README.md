Eazy Panel
==========

Simple read-only AWS panel for some resources. The idea is to acces certain resources without the need of going from window to window.

Next resources are available:

* ECS Tasks: Display ECS Tasks running filtered by cluster.

## Requirements
In order to embed static files in final binary you should have these:

* go get github.com/jteeuwen/go-bindata/...
* go get github.com/elazarl/go-bindata-assetfs/...


## Developing
Running both backend and ui development server:

Running backend:
```
# Having .aws configured or having environment variables
$ export AWS_ACCESS_KEY_ID=''
$ export AWS_SECRET_KEY=''
$ go install
$ eazy-panel
```

Running frontend:
```
$ cd ui
$ npm start
```

If only want to work on frontend browse to `http://localhost:3000` and it has a reverse proxy configured that redirects API calls to `http://localhost:8000`.

If only want to work on backend browse to `http://localhost:8000` and it will serve static files embeded in `ui/ui_gen.go`

## Building for production

First generate the production-ready static files

```
$ cd ui
# Build static files
$ npm run build
# Embed static files for final binary
$ npm run embed
```

In order to create the full binary

```
$ go install
# Location
$ which eazy-panel
```
