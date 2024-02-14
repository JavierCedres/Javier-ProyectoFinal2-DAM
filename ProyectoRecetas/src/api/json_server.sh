#ponemos la carpeta img en public ( realmente puede ser otro sitio si luego lo configuramos pero es la ruta que se espera)


#Lanzamos el comando estableciendo la ruta del json y de la carpeta para ficheros estáticos ( img, css, js,...)
json-server --watch fakeserver/recetas.json --host 192.168.0.17 --port 3000
json-server --watch fakeserver/recetas.json --host 172.26.5.0 --port 3000