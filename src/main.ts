import * as core from '@actions/core'
import * as config from './config'
import {PortainerClient} from './portainer'

async function run(): Promise<void> {
  try {
    const cfg = config.parse()
    core.debug(`parsed config: ${cfg}`)

    core.startGroup('Auth')
    const portainer = new PortainerClient(cfg.portainer.url)
    await portainer.login(cfg.portainer.username, cfg.portainer.password)
    core.endGroup()

    core.startGroup('Get State')
    core.info(`get current swarm id of endpoint #${cfg.portainer.endpoint}`)
    const swarm = await portainer.getSwarm(cfg.portainer.endpoint)

    core.info(`get stacks of swarm cluster ${swarm.id}`)
    const stacks = await portainer.getStacks(swarm.id)

    const stack = stacks.find(item => item.name === cfg.stack.name)

    if (!stack) {
      throw Error(`stack "${cfg.stack.name}" is not found`)
    }
    core.endGroup()

    core.startGroup('Delete Stack')
    await portainer.deleteStack(cfg.portainer.endpoint, stack.id)
    core.endGroup()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
