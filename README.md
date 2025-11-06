# 🚀 Laravel + Next.js + MySQL (Dockerized Fullstack App)

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🧩 Overview

This is a **full-stack web application** combining:
- 🧠 **Laravel** — REST API backend (PHP 8.3)
- ⚛️ **Next.js** — React frontend for UI
- 🗄️ **MySQL** — database
- 🐳 **Docker Compose** — for seamless containerized setup

Everything runs together using **Docker version 3.9**, so you can launch the entire system with one command.

---

## 🏗️ Project Structure

project-root/
│
├── laravel/ # Laravel backend (API)
│ ├── app/
│ ├── routes/
│ ├── database/
│ └── ...
│
├── nextjs/ # Next.js frontend
│ ├── pages/
│ ├── components/
│ ├── public/
│ └── ...
│
├── docker-compose.yml
└── README.md


---

## ⚙️ Requirements

Before running, make sure you have installed:
- [Docker Desktop](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)
- (Optional) [Node.js](https://nodejs.org/) and [Composer](https://getcomposer.org/) for local development

- git clone https://github.com/hakim220619/project-example.git
- cd project-example
- docker-compose up --build

| Service          | URL                                            | Description                |
| ---------------- | ---------------------------------------------- | -------------------------- |
| Laravel API      | [http://localhost:8080](http://localhost:8080) | Backend (Laravel)          |
| Next.js Frontend | [http://localhost:3000](http://localhost:3000) | Frontend (React + Next.js) |
| MySQL            | localhost:3306                                 | Database                   |

# Stop containers
docker-compose down

# Restart containers
docker-compose up -d

# View running containers
docker ps

# Enter Laravel container
docker exec -it project-laravel bash

# Enter MySQL container
docker exec -it project-mysql mysql -u root -p
