# Docker - Services
Services are really just “containers in production.” 

A service only runs one image, but it codifies the way that image runs—what ports it should use, how many replicas of the container should run so the service has the capacity it needs, and so on. 

Scaling a service changes the number of container instances running that piece of software, assigning more computing resources to the service in the process.

Scale services with Docker platform's docker-compose.yml file
The docker-compose.yml file defines how Docker containers should behave in production.

How a docker-compose.yml file looks:
```
version: "3"
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repo:tag
    deploy:
      replicas: 5
      resources:
        limits:
          cpus: "0.1"
          memory: 50M
      restart_policy:
        condition: on-failure
    ports:
      - "4000:80"
    networks:
      - webnet
networks:
  webnet:
```

This docker-compose.yml file tells Docker to do the following:

- Pull the image we uploaded in step 2 from the registry.
- Run 5 instances of that image as a service called web, limiting each one to use, at most, 10% of the CPU (across all cores), and 50MB of RAM.
- Immediately restart containers if one fails.
- Map port 4000 on the host to web’s port 80.
- Instruct web’s containers to share port 80 via a load-balanced network called webnet. (Internally, the containers themselves publish to web’s port 80 at an ephemeral port.)
- Define the webnet network with the default settings (which is a load-balanced overlay network).

Before we can run the new load-balanced app, we first run
```docker swarm init```
This is to make your node a swarm manager first

Now let’s run it. You need to give your app a name. Here, it is set to getstartedlab:
```
docker stack deploy -c docker-compose.yml getstartedlab
```

To get the service ID for the services in our application:
```
docker service ls
```

**Look for the web service prepended with your app name**
e.g. getstartedlab_web

#Tasks
A single container running in a service is called a task. Tasks are given unique IDs that numerically increment, up to the number of replicas you defined in docker-compose.yml. List the tasks for your service:
```
docker service ps getstartedlab_web
```
Tasks also show up if you just list all the containers on your system, though that is not filtered by service:
```
docker container ls -q
```

#Scale the app
Scale the app by changing the replicas value in docker-compose.yml, saving the change, and re-running the docker stack deploy command. Docker performs an in-place update, no need to tear the stack down first or kill any containers.
```
docker stack deploy -c docker-compose.yml getstartedlab
```
re-run docker container ls -q to see the deployed instances reconfigured. If you scaled up the replicas, more tasks, and hence, more containers, are started.

Take down the app
```
docker stack rm getstartedlab
```
Take down the swarm
```
docker swarm leave --force
```
Summary
```
docker stack ls                                            # List stacks or apps
docker stack deploy -c <composefile> <appname>  # Run the specified Compose file
docker service ls                 # List running services associated with an app
docker service ps <service>                  # List tasks associated with an app
docker inspect <task or container>                   # Inspect task or container
docker container ls -q                                      # List container IDs
docker stack rm <appname>                             # Tear down an application
docker swarm leave --force      # Take down a single node swarm from the manager
```
