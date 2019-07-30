# Docker - Containers

A container is launched by running an image. An image is an executable package that includes everything needed to run an application--the code, a runtime, libraries, environment variables, and configuration files.

A container is a runtime instance of an image--what the image becomes in memory when executed (that is, an image with state, or a user process). 
You can see a list of your running containers with the command, 
```docker ps```
, just as you would in Linux.

Containers:
1 set of Infrastructure, Host OS, Docker can host many containers
Each container contains an application and Bins/Libs that the application requires
The container seats on top of docker

Virtual Machine:
1 set of Infrastructure, Hypervisor
Each VM consist of a guest OS, bins/libs and the application
THe VM provides an environment with more resources

To view more details about your docker installation:
```docker info```

```
## List Docker CLI commands
docker
docker container --help

## Display Docker version and info
docker --version
docker version
docker info

## Execute Docker image
docker run hello-world

## List Docker images
docker image ls

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq
```

The container/ Dockerfile
- Is the lowest level in the hierarchy of a distributed application.
```Dockerfile```defines what goes on in the environment inside your container.

Contents in a Dockerfile:
```
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```
Accessing the name of the host when inside a container retrieves the container ID, which is like the process ID for a running executable.

To build the app, make sure you are at the top level of your new directory.
ls should show:
```
$ ls
Dockerfile		app.py			requirements.txt
```
Now run the build command. This creates a Docker image, which we’re going to tag using -t so it has a friendly name.
```
docker build -t friendlyhello .
```
Where is your built image? It’s in your machine’s local Docker image registry:
```
$ docker image ls

REPOSITORY            TAG                 IMAGE ID
friendlyhello         latest              326387cea398
```
Proxy server settings:
```
# Set proxy server, replace host:port with values for your servers
ENV http_proxy host:port
ENV https_proxy host:port
```
DNS Settings:

You can edit (or create) the configuration file at /etc/docker/daemon.json with the dns key, as following:
```
{
  "dns": ["your_dns_address", "8.8.8.8"]
}
```
In the example above, the first element of the list is the address of your DNS server. The second item is the Google’s DNS which can be used when the first one is not available.

Before proceeding, save daemon.json and restart the docker service.
```
sudo service docker restart
```
Once fixed, retry to run the build command.

Run the app:
```
docker run -p 4000:80 friendlyhello
```
Note: If you are using Docker Toolbox on Windows 7, use the Docker Machine IP instead of localhost. For example, http://192.168.99.100:4000/. To find the IP address, use the command docker-machine ip.

You can also use the curl command in a shell to view the same content.
```
$ curl http://localhost:4000
```
On Windows, explicitly stop the container

On Windows systems, CTRL+C does not stop the container. So, first type CTRL+C to get the prompt back (or open another shell), then type docker container ls to list the running containers, followed by 
```docker container stop <Container NAME or ID>``` 
to stop the container. Otherwise, you get an error response from the daemon when you try to re-run the container in the next step.

Sharing your image:
An account on a registry can create many repositories
A registry is a collection of repositories.
A repository is a collection of images. You can also think of the repository like a GitHub repository.

Summary of commands:
```
docker build -t friendlyhello .  # Create image using this directory's Dockerfile
docker run -p 4000:80 friendlyhello  # Run "friendlyname" mapping port 4000 to 80
docker run -d -p 4000:80 friendlyhello         # Same thing, but in detached mode
docker container ls                                # List all running containers
docker container ls -a             # List all containers, even those not running
docker container stop <hash>           # Gracefully stop the specified container
docker container kill <hash>         # Force shutdown of the specified container
docker container rm <hash>        # Remove specified container from this machine
docker container rm $(docker container ls -a -q)         # Remove all containers
docker image ls -a                             # List all images on this machine
docker image rm <image id>            # Remove specified image from this machine
docker image rm $(docker image ls -a -q)   # Remove all images from this machine
docker login             # Log in this CLI session using your Docker credentials
docker tag <image> username/repository:tag  # Tag <image> for upload to registry
docker push username/repository:tag            # Upload tagged image to registry
docker run username/repository:tag                   # Run image from a registry
```