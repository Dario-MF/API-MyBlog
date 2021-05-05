# API MyBlog
Api desarrollada en Node, Express y MongoDB.

- https://api-backend-myblog.herokuapp.com/api/


## End Points

### Auth

#### Registrarse 
- https://api-backend-myblog.herokuapp.com/api/auth/signup
    +  Registrarse en el blog. 
    +  Ejemplo petición fetch:
   
            ```
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
            ```

#### Loguearse
- https://api-backend-myblog.herokuapp.com/api/auth/signin
    +  Login en el blog.
    +  Ejemplo petición fetch:

            ```
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
            ```

#### Refresh Token
- https://api-backend-myblog.herokuapp.com/api/auth/refresh
    +   Refresh del token de usuario.
    +  Ejemplo petición fetch:

            ```
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
            ```
