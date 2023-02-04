# Simple Mongo Geoqueries

## Usage

Make a GET request to `/` with `lat`, `long` and `distance` query parameters to receive back a JSON with the cities on your database that are inside the area specified.

## Running

First, make sure `docker-compose` is installed in your system.

The, start the app by running:

```bash
$ docker-compose up -d
```

Whenever you are done, stop the app by running:

```bash
$ docker-compose stop
```

If you are not going to run the app anymore, remove it by running:

```bash
$ docker-compose down
```