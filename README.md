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
      - /path/to/settings.json:/usr/src/app/settings.json
```

## Configuration
Configuration and customization settings are read from `/settings.json`. If this file does not exist when the server is started, it will be created with the contents of `settings.default.json`.

Currently, there is no way to add modules from the UI.  An example configuration for a link list module:

```...
    {
      "type": "link-list",
      "name": "Utilities",
      "icon": "settings",
      "links": [
        {
          "id": 0,
          "icon": "ubiquiti",
          "name": "Unifi",
          "description": "Network management",
          "url": "..."
        },
        {
          "id": 1,
          "icon": "ubiquiti",
          "name": "Router",
          "description": "EdgeRouter X",
          "url": "..."
        },
        {
          "id": 2,
          "name": "Portainer",
          "description": "Container management",
          "url": "..."
        },
        {
          "id": 3,
          "name": "Pi-hole",
          "description": "DNS ad-blocker",
          "url": "..."
        },
        {
          "id": 4,
          "name": "ProxMox",
          "description": "Hypervisor",
          "url": "..."
        }
      ]
    }
```
