---
id: port_management
title: Technical infrastructure for nodes
sidebar_label: Port management
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png 
---

Here is a list of default ports used across Matic nodes:
## BoR

| ﻿Name                   | Port  | Tags                      | Description                                                                                                    |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Network listening port | 30303 | public                    | Network listening port. Bor uses this port to connect to peers and sync                                        |
| RPC server             | 8545  | can-be-public, internal   | RPC port to send transaction and get data from Bor. Heimdall uses this port to get Bor headers for checkpoints |
| WS server              | 8546  | can-be-public, internal   | Websocket port                                                                                                 |
| Graphql server         | 8547  | can-be-public, internal   | Graphql port                                                                                                   |
| Prometheus server      | 9091  | can-be-public, monitoring | Prometheus server APIs as datasource in Grafana. It can be mapped to 80/443 through nginx reverse proxy        |
| Grafana server         | 3001  | can-be-public, monitoring | Grafana web sever. It can be mapped to 80/443 through nginx reverse proxy                                      |
| Pprof server           | 7071  | internal, monitoring      | Pprof server to collect metrics from Bor                                                                       |
| UDP discovery          | 30301 | can-be-public, internal   | Bootnode default port (for peer discovery)                                                                     |

## Heimdall

| ﻿Name                   | Port  | Tags                      | Description                                                                                                    |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Network listening port | 30303 | public                    | Network listening port. Bor uses this port to connect to peers and sync                                        |
| RPC server             | 8545  | can-be-public, internal   | RPC port to send transaction and get data from Bor. Heimdall uses this port to get Bor headers for checkpoints |
| WS server              | 8546  | can-be-public, internal   | Websocket port                                                                                                 |
| Graphql server         | 8547  | can-be-public, internal   | Graphql port                                                                                                   |
| Prometheus server      | 9091  | can-be-public, monitoring | Prometheus server APIs as datasource in Grafana. It can be mapped to 80/443 through nginx reverse proxy        |
| Grafana server         | 3001  | can-be-public, monitoring | Grafana web sever. It can be mapped to 80/443 through nginx reverse proxy                                      |
| Pprof server           | 7071  | internal, monitoring      | Pprof server to collect metrics from Bor                                                                       |
| UDP discovery          | 30301 | can-be-public, internal   | Bootnode default port (for peer discovery)                                                                     |