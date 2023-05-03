#!/bin/bash

# Ejecutar el script para generar modelos
sh generate_models.sh

# Ejecutar el script para agregar relaciones
sh generate_relations.sh

# Ejecutar el script para sincronizar la base de datos
node sync-db.js
