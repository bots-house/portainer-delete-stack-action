# portainer-delete-stack-action

Delete stack created by [bots-house/portainer-deploy-stack-action](https://github.com/bots-house/portainer-deploy-stack-action).

## Usage

```yaml
name: CI

on:
  push:
    branches:
      - main 

jobs:
  deploy:
    name: Delete Stack
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: bots-house/portainer-delete-stack-action@main
        with:
          # url of Poratainer instance
          portainer-url: ${{ secrets.PORTAINER_URL }}

          # portainer auth
          portainer-username: ${{ secrets.PORTAINER_USERNAME }}
          portainer-password: ${{ secrets.PORTAINER_PASSWORD }}
          
          # internal portainer cluster id
          portainer-endpoint: 1
          
          # stack name
          stack-name: whoami
```