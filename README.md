## Laravel Docker Template
This is a docker template for laravel application containing Inertia with React and support MYSQL & phpmyadmin. This  template support varieties falvour of docker setup. checkout the branches for more info. This docker setup was inspired from official docker [website](https://github.com/dockersamples/laravel-docker-examples).

### Features
- Laravel 12
- Docker
- Nginx
- PHP 8.2 
- MySQL 8.4
- PHPMyAdmin
- Xdebug
- Tailwind CSS v4
- Vite
- React
- Inertia.js
- Shadcn UI

### Noticeable Points
- check the bracnhes, there are many types of setup. and i am planning to bring more!

- you can access the laravel application within same network. i dont know if hmr works or not. 

- you might notice, on `make dev` command, we are kinda building the whole app. its necessary otherwise vite & exposing network does not work. but no worry! if you dont keep modifying core docker related configs. then development server will keep starting faster!

- you can easily swap with postgresql. but i like to work on mysql. maybe later, i will add postgresql support branch.

- checkout makefile & configure it for your needs! development experience will get better.

- after stoping development, it is better to stop containers. do it by `make down` command.

### Installation & Setup
1. Clone the repository
    ```bash
    git clone https://github.com/nishatislam04/laravel-docker-template.git
    ```
2. Copy the .env.example file to .env
    ```bash
    cp .env.example .env
    ```
3. install dependencies
    ```bash
    composer install
    ```
4. Generate the application key
    ```bash
    php artisan key:generate
    ```
5. install node modules
    ```bash
    npm install
    ```
6. Build the docker containers & serve the app. (it need to be run alaways)
    ```bash
    make dev
    ```
7. **Update makefile php_container variable with your php container name.** its  a MUST!  if you want to use makefile command. get the running container names by `docker ps` command.
    ```bash
    PHP_CONTAINER = *-php-fpm-1
    ```
8. Run the database migrations. (in another terminal)
    ```bash
    make migrate
    ```
9. Access the application.
    > for this. make sure, your machine private ip is properly configured in .env file.
    ```bash
    http://192.168.0.106
    ```
10. Access phpmyadmin
    ```bash
    http://localhost:8080
    ```

### Access 
- phpmyadmin: http://localhost:8080
- laravel app: http://192.168.0.106 
(192.168.0.106 is the private ip address of my development machine. you configure it for your own machine.)

### Development
- Every now and then execute `composer dump-autoload` command.

### Fix
- Err_Address_Not_Reachable: it is because, we are using private ip address. which can randomly change. to fix it, you need to configure your router admin panel & set a static private ip address for your development machine. then update the ip address in .env file at both `APP_URL` & `PRIVATE_IP`
