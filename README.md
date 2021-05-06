# API MyBlog
Api desarrollada en Node, Express y MongoDB.

- https://api-backend-myblog.herokuapp.com/api/

## Menú
### <a href="#Points">End Points</a>
- Auth
    - <a href="#Registrarse">Registrarse</a>
    - <a href="#Loguearse">Loguearse</a>
    - <a href="#Refresh">Refresh</a>
- Usuarios
    - <a href="#Buscar_usuarios">Buscar usuarios</a>
    - <a href="#Buscar_usuario_ID">Buscar usuario por ID </a>
    - <a href="#Actualizar_usuario">Actualizar usuario </a>
    - <a href="#Elimnar_usuario">Elimnar usuario </a>
- Posts
    - <a href="#Buscar_posts">Buscar posts</a>
    - <a href="#Buscar_posts_autor">Buscar posts por autor</a>
    - <a href="#Buscar_posts_palabra">Buscar posts por palabra</a>
    - <a href="#Buscar_id_post">Buscar post por id</a>
    - <a href="#Crear_post">Crear post</a>
    - <a href="#Actualizar_post">Actualizar post</a>
    - <a href="#Eliminar_post">Eliminar post</a>
- Comentarios
    - <a href="#Buscar_comentarios">Buscar comentarios</a>
    - <a href="#Crear_comentario">Crear comentario</a>
    - <a href="#Actualizar_comentario">Actualizar comentario</a>
    - <a href="#Eliminar_comentario">Eliminar comentario</a>
- Uploads
    - <a href="#Actualizar_img">Actualizar img</a>






<h2 id="Points">End Points</h2>

### Auth

#### <h4 id="Registrarse">Registrarse</h4>
- URL: https://api-backend-myblog.herokuapp.com/api/auth/signup
- Ruta publica.
- Registrarse en el blog. 
    +  Ejemplo petición fetch:
   
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(
                {
                    "name": "requerido",
                    "surname": "requerido",
                    "email": "requerido",
                    "roles": ["(USER_ROLE) predefinido, no requerido"],
                    "password": "requerido"
                }
            );

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api-backend-myblog.herokuapp.com/api/auth/signup", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            

     +  Ejemplo respuesta API:

            
                {
                    "msg": "Signup correct",
                    "token": "token",
                    "user": {
                        "roles": [
                        "id_role"
                        ],
                        "google": false,
                        "state": true,
                        "name": "",
                        "surname": "",
                        "email": "",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "createdAt": "",
                        "updatedAt": "",
                        "posts": "(url.env)/posts?author=(uid)&page=1",
                        "uid": ""
                    }
                }
            

#### <h4 id="Loguearse">Loguearse</h4>
- URL: https://api-backend-myblog.herokuapp.com/api/auth/signin
- Ruta publica.
- Login en el blog.
    +  Ejemplo petición fetch:

            
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(
                    {
                        "email": "requerido",
                        "password": "requerido"
                    }
                );

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://api-backend-myblog.herokuapp.com/api/auth/signin", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    +  Ejemplo respuesta API:

             
                {
                    "msg": "Signin correct",
                    "token": "token",
                    "user": {
                        "roles": [
                        "id_role"
                        ],
                        "google": false,
                        "state": true,
                        "name": "",
                        "surname": "",
                        "email": "",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "createdAt": "",
                        "updatedAt": "",
                        "posts": "(url.env)/posts?author=(uid)&page=1",
                        "uid": ""
                    }
                }
            

#### <h4 id="Refresh">Refresh Token</h4>
- URL: https://api-backend-myblog.herokuapp.com/api/auth/refresh
- Ruta privada.
- Refresh del token de usuario.
    +   Ejemplo petición fetch:

            
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "token");

                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                };

                fetch("https://api-backend-myblog.herokuapp.com/api/auth/refresh", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
     +  Ejemplo respuesta API:

            
                {
                    "msg": "refresh correct",
                    "token": "newToken",
                    "user": {
                        "roles": [
                        "id_role"
                        ],
                        "google": false,
                        "state": true,
                        "name": "",
                        "surname": "",
                        "email": "",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "createdAt": "",
                        "updatedAt": "",
                        "posts": "(url.env)/posts?author=(uid)&page=1",
                        "uid": ""
                    }
                }
            

### Usuarios

#### <h4 id="Buscar_usuarios">Buscar usuarios</h4>
- URL: https://api-backend-myblog.herokuapp.com/api/users?page=1
- Ruta publica, información de usuario limitada.
- Por pagina, (9 usuarios por pagina)
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/users?page=1", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "respuesta OK",
                "data": {
                    "page": 1,
                    "pages": 1,
                    "next_page": (url),
                    "prev_page": (url),
                    "total_users": 1,
                    "users": [
                        {
                            "roles": [
                            {
                                "name": "USER_ROLE"
                            }
                            ],
                            "name": "",
                            "surname": "",
                            "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                            "posts": "(url.env)/posts?author=(uid)&page=1",
                            "uid": ""
                        }
                    ]
                }
            }  
   
#### <h4 id="Buscar_usuario_ID">Buscar usuario por ID</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/users/(uid)
- Ruta publica, información de usuario limitada.
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/users/(uid)", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "respuesta OK",
                "data": {
                    "roles": [
                    {
                        "name": "USER_ROLE"
                    }
                    ],
                    "name": "",
                    "surname": "",
                    "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                    "posts": "(url.env)/posts?author=(uid)&page=1",
                    "uid": ""
                }
            }


#### <h4 id="Actualizar_usuario">Actualizar usuario</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/users/(uid)
- Ruta privada, dueño de la cuenta o rango Administrador (modificar rol, solo administrador).
    + Ejemplo petición fetch:
 
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "(token)");
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(
                    {
                        "name": "",
                        "surname": "",
                        "email": "",   
                        "newPassword": "",
                        "oldPassword": "",
                        "facebookUrl": "",
                        "githubUrl": "",
                        "linkedinUrl": "",
                        "twitterUrl": "",
                        "newPasword": "", // si hay campo en blanco no actualiza password.
                        "oldPassword": "" // si hay campo en blanco no actualiza password.
                    }
                );

                const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://api-backend-myblog.herokuapp.com/api/users/(uid)", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "user updated",
                "msgPassword": "password no updated",
                "data": {
                        "roles": [
                        {
                            "name": "USER_ROLE"
                        }
                        ],
                        "name": "",
                        "surname": "",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "posts": "(url.env)/posts?author=(uid)&page=1",
                        "uid": ""
                    }
            }

#### <h4 id="Elimnar_Usuario">Elimnar Usuario</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/users/(uid)
- Ruta privada, dueño de la cuenta o rango Administrador.
- El usuario pasa a estado inactivo,
    + Ejemplo petición fetch:
 
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "(token)");

                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("https://api-backend-myblog.herokuapp.com/api/users/(uid)", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "user deleted"
            }

### Posts

#### <h4 id="Buscar_posts">Buscar posts</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts?page=1
- Ruta publica.
- Por pagina, (9 posts por pagina)
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/posts?page=1", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "get posts OK",
                "data": {
                    "page": 0,
                    "pages": 0,
                    "next_page": null,
                    "prev_page": null,
                    "total_posts": 0,
                    "posts": []
                }
            }

#### <h4 id="Buscar_posts_autor">Buscar posts por autor</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts?author=(uid)&page=1
- Ruta publica.
- Por pagina, (9 posts por pagina)
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/posts?author=(uid)&page=1", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "get posts OK",
                "data": {
                        "page": 0,
                        "pages": 0,
                        "next_page": null,
                        "prev_page": null,
                        "total_posts": 0,
                        "posts": []
                    }
            }

#### <h4 id="Buscar_posts_palabra">Buscar posts por palabra</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts?search=(palabra)&page=1
- Ruta publica.
- Por pagina, (9 posts por pagina)
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/posts?search=(palabra)&page=1", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "get posts OK",
                "data": {
                        "page": 0,
                        "pages": 0,
                        "next_page": null,
                        "prev_page": null,
                        "total_posts": 0,
                        "posts": []
                    }
            }
#### <h4 id="Buscar_id_post">Buscar por id del post</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts/(post id)
- Ruta publica.
- Por pagina, (9 posts por pagina)
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/posts/(post id)", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "get post OK",
                "data": {
                        "author": {
                            "name": "",
                            "surname": "",
                            "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                            "posts": "(url)/posts?author=(uid)&page=1",
                            "uid": ""
                        },
                        "title": "",
                        "subtitle": "",
                        "img": "(url cloudinary)",
                        "article": "",
                        "createdAt": "",
                        "updatedAt": ""
                    }
            }

#### <h4 id="Crear_post">Crear post</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts
- Ruta privada, minimo rango usuario.
    +   Ejemplo petición fetch:

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");
            myHeaders.append("Authorization", "(token)");

            const formdata = new FormData();
            formdata.append("archivo", fileInput.files[0], "(path-file)");
            formdata.append("title", "titulo");
            formdata.append("subtitle", "subtitulo");
            formdata.append("article", "article");

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api-backend-myblog.herokuapp.com/api/posts", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "post created: OK",
                "data": {
                    "_id": "",
                    "title": "",
                    "subtitle": "",
                    "img": "(url cloudinary)",
                    "article": "",
                    "createdAt": "",
                    "updatedAt": "",
                    "author": {
                        "name": "",
                        "surname": "",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "posts": "(url)/posts?author=(uid)&page=1",
                        "uid": ""
                    }
                }
            }

#### <h4 id="Actualizar_post">Actualizar post</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts/(post id)
- Ruta privada, dueño del post o rango Moderador/Administrador.
- Si no se desea modificar un campo basta con dejarlo en blanco o no mandarlo.
    +   Ejemplo petición fetch:

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");
            myHeaders.append("Authorization", "(token)");

            const formdata = new FormData();
            formdata.append("archivo", fileInput.files[0], "(path-file)");
            formdata.append("title", "titulo");
            formdata.append("subtitle", "subtitulo");
            formdata.append("article", "article");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api-backend-myblog.herokuapp.com/api/posts", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "post updated: OK",
                "data": {
                    "_id": "",
                    "title": "",
                    "subtitle": "",
                    "img": "(url cloudinary)",
                    "article": "",
                    "createdAt": "",
                    "updatedAt": "",
                    "author": {
                        "name": "",
                        "surname": "",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "posts": "(url)/posts?author=(uid)&page=1",
                        "uid": ""
                    }
                }
            }

#### <h4 id="Eliminar_post">Eliminar post</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/posts/(post id)
- Ruta privada, dueño del post o rango Moderador/Administrador.
    +   Ejemplo petición fetch:

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "(token)");

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://api-backend-myblog.herokuapp.com/api/posts/(post id)", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "post deleted OK"
            }

### Comentarios

#### <h4 id="Buscar_comentarios">Buscar comentarios</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/comments/(post ref id)?page=1
- Ruta publica.
- Por pagina, (9 comentarios por pagina)
    +   Ejemplo petición fetch:

            
            fetch("https://api-backend-myblog.herokuapp.com/api/comments/(post ref id)?page=1", 'GET')
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            
    + Ejemplo respuesta API:   
            
            {
                "msg": "response OK",
                "data": {
                    "page": 1,
                    "pages": 1,
                    "next_page": null,
                    "prev_page": null,
                    "total_comments": 1,
                    "comments": [
                        {
                            "_id": "",
                            "post": "",
                            "author": {
                                "name": "",
                                "surname": "",
                                "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                                "posts": "(url)/posts?author=(uid)&page=1",
                                "uid": ""
                            },
                            "comment": "",
                            "createdAt": "",
                            "updatedAt": ""
                        }
                    ]
                }
            }
#### <h4 id="Crear_comentario">Crear comentario</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/comments/(post ref id)
- Ruta privada.
    +   Ejemplo petición fetch:

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "(token)");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "comment": ""
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/comments/(post ref id)", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                        
+ Ejemplo respuesta API:   
        
            {
                "msg": "comment created: OK",
                "data": {
                    "_id": "",
                    "post": "(id ref post)",
                    "author": {
                        "name": "",
                        "surname": "",
                        "posts": "(url)/posts?author=(uid)&page=1",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "uid": ""
                    },
                    "comment": "",
                    "createdAt": "",
                    "updatedAt": ""
                }
            }

#### <h4 id="Actualizar_comentario">Actualizar comentario</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/comments/(comment id)
- Ruta privada, solo dueño del comentario, Moderador/Administrador.
    +   Ejemplo petición fetch:

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "(token)");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "comment": ""
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/comments/(comment id)", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                        
+ Ejemplo respuesta API:   
        
            {
                "msg": "comment updated: OK",
                "data": {
                    "_id": "",
                    "post": "(id ref post)",
                    "comment": "",
                    "createdAt": "",
                    "updatedAt": "",
                    "author": {
                        "name": "",
                        "surname": "",
                        "posts": "(url)/posts?author=(uid)&page=1",
                        "img": "https://gravatar.com/avatar/(md5-email)?d=retro",
                        "uid": ""
                    }
                }
            }

#### <h4 id="Eliminar_comentario">Eliminar comentario</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/comments/(comment id)
- Ruta privada, solo dueño del comentario, Moderador/Administrador.
    +   Ejemplo petición fetch:

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "(token)");

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/comments/(comment id)", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                        
    + Ejemplo respuesta API:   
        
            {
                "msg": "comment deleted OK"
            }

### Uploads

#### <h4 id="Actualizar_img">Actualizar img usuario</h4> 
- URL: https://api-backend-myblog.herokuapp.com/api/uploads/users/(user id)
- Ruta privada, solo dueño del usuario o Administrador.

    +   Ejemplo petición fetch:

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "(token)");
            myHeaders.append("Content-Type", "multipart/form-data");

            const formdata = new FormData();
            formdata.append("archivo", fileInput.files[0], "(path img)");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api-backend-myblog.herokuapp.com/api/uploads/users/(user id)", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

    + Ejemplo respuesta API: 


            {
                "msg": "Img updated OK",
                "data": {
                    "roles": [
                        ""
                    ],
                    "google": false,
                    "state": true,
                    "name": "",
                    "surname": "",
                    "email": "",
                    "img": "(url cloudinary)",
                    "createdAt": "",
                    "updatedAt": "",
                    "posts": "(url)/posts?author=(uid)&page=1",
                    "uid": ""
                }
            }
         
