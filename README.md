# Laravel Products

This is a laravel 12 application with docker with react inertia. we will practise real world multi-tenants e-commerce with react inertia.

## Features

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

### Installation & Setup

0. Installing Laravel on you machine
    - [Laravel Installation](https://laravel.com/docs/12.x/installation)

1. Clone the repository

    ```bash
    git clone https://github.com/nishatislam04/laravel-products.git
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

7. **Update makefile php_container variable with your php container name.** 
    > its a MUST!  if you want to use makefile command. get the running container names by `docker ps` command. then update makefile with your php container name.

    ```bash
    PHP_CONTAINER = *-php-fpm-1
    # example: PHP_CONTAINER = laravel-products-php-fpm-1
    ```

8. Run the database migrations. (in another terminal)

    ```bash
    make migrate
    ```

9. or optionally run migration & seed together by

    ```bash
    make migrate-seed
    ```

10. Access the application.
    > for this. make sure, your machine **PRIVATE_IP** variable is properly configured in .env file.

    ```bash
    http://192.168.0.106
    ```

11. Access phpmyadmin

    ```bash
    http://localhost:8080
    ```

### Access

- laravel app: <http://192.168.0.106>
- phpmyadmin: <http://localhost:8080>

*192.168.0.106 is the private ip address of my development machine. you configure it for your own machine.*

### Development

- Every now and then execute `composer dump-autoload` command.

### Fix

- **Err_Address_Not_Reachable**: it is because, we are using private ip address. which can randomly change. to fix it, you need to configure your router admin panel & set a static private ip address for your development machine. then update the ip address in .env file at both `APP_URL` & `PRIVATE_IP`
