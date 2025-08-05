.PHONY: artisan migrate migrate-fresh migrate-seed seed tinker cache-clear composer-install npm-install npm-dev npm-build down flush flush-hard

PHP_CONTAINER =  laravel-products-php-fpm-1

dev:
	docker compose -f compose.dev.yaml up --build

down:
	docker compose -f compose.dev.yaml down

prod:
	docker compose -f compose.prod.yaml --build -d

migrate:
	docker exec $(PHP_CONTAINER) php artisan migrate

# drop all tables and re-create them
migrate-fresh:
	docker exec $(PHP_CONTAINER) php artisan migrate:fresh

# drop all tables and re-create them and seed
migrate-seed:
	docker exec $(PHP_CONTAINER) php artisan migrate:fresh --seed

seed:
	docker exec $(PHP_CONTAINER) php artisan db:seed

tinker:
	docker exec -it $(PHP_CONTAINER) php artisan tinker

# make artisan cmd="make:model QrCode -mfs"
artisan:
	docker exec -it $(PHP_CONTAINER) php artisan $(cmd)

cache-clear:
	docker exec $(PHP_CONTAINER) php artisan config:clear
	docker exec $(PHP_CONTAINER) php artisan route:clear
	docker exec $(PHP_CONTAINER) php artisan view:clear	

composer-install:
	docker exec $(PHP_CONTAINER) composer install

npm-install:
	npm install

npm-build:
	npm run build

flush:
	@echo "⚠️  Flushing Docker containers, volumes, images..."
	@docker compose down --volumes --remove-orphans
	@docker system prune --all --volumes --force
	@docker builder prune --all --force
	@docker volume prune --force
	@docker image prune --all --force
	@echo "✅ Docker reset complete. You now have a clean slate."

flush-hard:
	@echo "⚠️  HARD FLUSH: Deleting node_modules, Docker cache..."
	@docker compose down --volumes --remove-orphans
	@docker system prune --all --volumes --force
	@docker builder prune --all --force
	@docker volume prune --force
	@docker image prune --all --force
	@rm -rf node_modules pnpm-lock.yaml yarn.lock package-lock.json
	@echo "🧹 Hard cleanup done. Please run \`make build\` again."


