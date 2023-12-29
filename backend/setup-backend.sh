#!/bin/bash

# Instalar dependencias del backend
npm install

# Crear esquema de la base de datos
npx sequelize-cli db:migrate


echo "Configuración del backend completada. Ahora, ejecuta 'npm start' para iniciar el servidor."
