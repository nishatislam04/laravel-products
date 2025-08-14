.PHONY: artisan migrate migrate-fresh migrate-seed seed tinker cache-clear composer-install npm-install npm-dev npm-build down flush flush-hard build

PHP_CONTAINER =  laravel-products-php-fpm-1

# Start development environment (fast start, no rebuild)
dev:
	docker compose -f compose.dev.yaml up

# Build containers without starting (use when Dockerfiles change or forced rebuild needed)
build-dev:
	docker compose -f compose.dev.yaml build

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

ide-helper:
	docker exec $(PHP_CONTAINER) php artisan ide-helper:generate
	docker exec $(PHP_CONTAINER) php artisan ide-helper:meta
	docker exec $(PHP_CONTAINER) php artisan ide-helper:models --nowrite

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

# Soft reset: Removes containers, networks, and volumes but keeps images and builder cache
# Use when you want to start fresh but keep built images for faster rebuilds
flush:
	@echo "⚠️  Soft reset: Removing containers, networks, and volumes..."
	@docker compose -f compose.dev.yaml down --volumes --remove-orphans
	@docker volume prune --force
	@echo "✅ Soft reset complete. Run 'make dev' to start again."

# Hard reset: Removes everything including images, build cache, and node_modules
# Use when you want to completely start over or are experiencing build issues
flush-hard:
	@echo "⚠️  HARD RESET: This will remove ALL Docker resources and node_modules!"
	@read -p "Are you sure? (y/N) " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "Removing all Docker resources..."; \
		docker compose -f compose.dev.yaml down --volumes --remove-orphans; \
		docker system prune --all --volumes --force; \
		docker builder prune --all --force; \
		echo "Removing node_modules and lock files..."; \
		rm -rf node_modules pnpm-lock.yaml yarn.lock package-lock.json; \
		echo "✅ Hard reset complete. Run 'make build' to rebuild everything."; \
	else \
		echo "Hard reset cancelled."; \
	fi


