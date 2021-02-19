import * as core from '@actions/core'
import {URL} from 'url'

export interface PortainerConfig {
  url: URL
  username: string
  password: string
  endpoint: number
}

export interface StackConfig {
  name: string
}

export interface Config {
  portainer: PortainerConfig
  stack: StackConfig
}

export function parse(): Config {
  return {
    portainer: parsePortainerConfig(),
    stack: parseStackConfig()
  }
}

function parsePortainerConfig(): PortainerConfig {
  return {
    url: new URL(core.getInput('portainer-url', {required: true})),
    username: core.getInput('portainer-username', {required: true}),
    password: core.getInput('portainer-password', {required: true}),
    endpoint: parseInt(core.getInput('portainer-endpoint', {required: true}))
  }
}

function parseStackConfig(): StackConfig {
  return {
    name: core.getInput('stack-name')
  }
}
