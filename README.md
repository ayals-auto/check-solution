check-solution
------------------------------------------------------------------------------
python solution for build XML

1. using os walk to check all files in the current directory and subdirectories.
2. trying to parse the XML. the first time probably will fail since the XML file contains "junk".
3. the exception caching the line where the parse is failed.
4. send the file to function that creates a new file only with XML structure.
5. send the file back to the  XML parsing function. removing the new file.
----------------------------------------------------------------------------
1. gui - using simple gui PySimpleGUI -- tested on windows


web server solution.
--------------------------------------------------------------------------------
Main logic - the enviorment where this server is running must be connected to the internet.
1. sending post to the server stores in the request on mongo(Mlab)
2. Get function counting the number of documents in the collection and sending the answer to the user.
3. refresh button is sending also get request.

frontend - created with angular nginx as proxy.
backend - node js server 

running web server.
---------------------------------------------------------------------------------
Run as docker container
created two docker files 
1. file for backend server 
2. file for front in angular-front libery
3. docker compose file

run: docker-compose up --build -d


Run on Kubernetes 
kubernetes folder 
1. backend-node.yaml
2. front-angular.yaml



