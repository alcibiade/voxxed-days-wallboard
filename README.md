# Voxxed Days Wallboard

A Wallboard application for Voxxed Days Luxembourg 2018.

## Running the application

### Using Docker

Create a new image:

```
$ docker build -t wallboard .
[...]
```

Run this image locally:

```
$ docker run -d --name wallboard-1 -p8000:80 wallboard
d9ccb2e7a899d5402876b5bb2bc71a468027f8cee66f6b59e6402b85b2592926
```

Result is:

```
yk@triton:~/Documents/voxxed-days-wallboard$ docker-ascii-map 
       +- bridge --------+
8000 ]-+ [✓] wallboard-1 |
       |     wallboard   |
       +-----------------+

```

### Using docker-compose

A docker-compose configuration is provided for a simplified setup.

```
$ docker-compose up --build -d
```

The target infrastructure listens on host port 8080 by default:

```
$ $ docker-ascii-map 
         +- voxxeddayswallboard_default -+
  8080 ]-+ [✓] voxxeddayswallboard_web_1 |
         |     voxxeddayswallboard_web   |
         +-------------------------------+

```

The system can be shut down:
```
$ docker-compose down
Stopping voxxeddayswallboard_web_1 ... done
Removing voxxeddayswallboard_web_1 ... done
Removing network voxxeddayswallboard_default
```