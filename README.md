![dashi](https://user-images.githubusercontent.com/1876231/102696464-6999c980-41e3-11eb-91c4-860e8f0c98e6.png)

![Screenshot of an example configuration](https://user-images.githubusercontent.com/1876231/102650793-4b1eca00-4120-11eb-9798-0a6728aa1dbf.png)

## Getting Started
- Clone this repository: `git clone https://github.com/jamjnsn/dashi.git`
- Start the server: `npm run serve`
- Head to `http://localhost:8000`

## Docker
### Compose
**docker-compose.yml example:**
```
services:
  dashi:
    image: jamjnsn/dashi:latest
    environment:
      NODE_ENV: production
    ports:
      - 8000:8000
    volumes:
      - config:/usr/src/app/config
volumes:
  config:
```
