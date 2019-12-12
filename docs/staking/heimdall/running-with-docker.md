## Install docker 

You can install docker from [here]()

## Running heimdall with docker

## Run docker 

```
$ docker run -d --name matic-heimdall -p 1317:1317 -p 26656:26656 -p 26657:26657 -it maticnetwork/heimdall:CS1001 bash
```

## Check your docker container is now running
```
$ docker ps

// Output should be something like this
CONTAINER ID        IMAGE                              COMMAND             CREATED             STATUS              PORTS                                                          NAMES
76cede244f3c        mankenavenkatesh/heimdall:CS1001   "bash"              13 seconds ago      Up 10 seconds       0.0.0.0:1317->1317/tcp, 0.0.0.0:26656-26657->26656-26657/tcp   matic-heimdall
```

Yay! Your heimdall is installed and is now running inside a docker container!

## Attach to your container
```
$ docker exec -it matic-heimdall bash
```

Here you can access binaries like `heimdalld` and `heimdallcli`

Check out your version by running the command given below

```
$ heimdallcli version --long

// Expected Output
name: heimdall
server_name: heimdalld
client_name: heimdallcli
version: CS-1001
commit: 812ab544c1f658acf5f84c0b2e4bfe9943fa4854
go: go version go1.13.4 darwin/amd64
```

> To connect to a public testnet run Step-1 from [here](../join-public-testnet#step-1-get-heimdall-genesis-config)

