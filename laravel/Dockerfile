# PHP 8.3 for composer compatibility
FROM php:8.3-cli

# Install system dependencies + mysql client
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libonig-dev \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql mbstring zip

# Set working directory
WORKDIR /var/www/html

# Copy composer from official composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . .

# Set permissions (optional)
RUN chown -R www-data:www-data /var/www/html
