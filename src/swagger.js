export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "API de Inventario de Videojuegos",
      version: "1.0.0",
      description: "API CRUD de productos (videojuegos), clientes y ventas usando Express y Swagger"
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor local"
      }
    ],
    paths: {
      "/productos": {
        get: {
          summary: "Obtener todos los videojuegos",
          responses: {
            200: {
              description: "Lista de videojuegos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Producto" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Registrar un videojuego",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductoInput" }
              }
            }
          },
          responses: {
            201: { description: "Videojuego creado" },
            400: { description: "Datos inválidos" }
          }
        }
      },
      "/productos/{id}": {
        get: {
          summary: "Obtener videojuego por ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID del videojuego (ObjectId)"
            }
          ],
          responses: {
            200: { description: "Videojuego encontrado" },
            404: { description: "No encontrado" }
          }
        },
        patch: {
          summary: "Actualizar videojuego",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductoInput" }
              }
            }
          },
          responses: {
            200: { description: "Actualizado correctamente" },
            404: { description: "No encontrado" }
          }
        },
        delete: {
          summary: "Eliminar videojuego",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            204: { description: "Eliminado" },
            404: { description: "No encontrado" }
          }
        }
      },
      "/clientes": {
        get: {
          summary: "Obtener todos los clientes",
          responses: {
            200: {
              description: "Lista de clientes",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Cliente" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Registrar cliente",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ClienteInput" }
              }
            }
          },
          responses: {
            201: { description: "Cliente registrado" },
            400: { description: "Datos inválidos" }
          }
        }
      },
      "/clientes/{id}": {
        patch: {
          summary: "Actualizar cliente",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ClienteInput" }
              }
            }
          },
          responses: {
            200: { description: "Cliente actualizado" },
            404: { description: "No encontrado" }
          }
        },
        delete: {
          summary: "Eliminar cliente",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            204: { description: "Eliminado" },
            404: { description: "No encontrado" }
          }
        }
      },
      "/ventas": {
        get: {
          summary: "Obtener todas las ventas",
          responses: {
            200: {
              description: "Lista de ventas",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Venta" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Registrar una venta",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/VentaInput" }
              }
            }
          },
          responses: {
            201: { description: "Venta registrada" },
            400: { description: "Datos inválidos" }
          }
        }
      },
      "/ventas/{id}": {
        get: {
          summary: "Obtener venta por ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "Venta encontrada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Venta" }
                }
              }
            },
            404: { description: "Venta no encontrada" }
          }
        }
      }
    },
    components: {
      schemas: {
        Producto: {
          type: "object",
          properties: {
            _id: { type: "string", example: "652ab8f128d0a2c3456789ab" },
            nombre: { type: "string", example: "Super Mario Bros" },
            plataforma: { type: "string", example: "Nintendo Switch" },
            precio: { type: "number", example: 59.99 },
            stock: { type: "integer", example: 100 }
          }
        },
        ProductoInput: {
          type: "object",
          required: ["nombre", "plataforma", "precio", "stock"],
          properties: {
            nombre: { type: "string" },
            plataforma: { type: "string" },
            precio: { type: "number" },
            stock: { type: "integer" }
          }
        },
        Cliente: {
          type: "object",
          properties: {
            _id: { type: "string", example: "652ab8f128d0a2c3456789aa" },
            nombre: { type: "string", example: "Juan Pérez" },
            email: { type: "string", example: "juan@example.com" }
          }
        },
        ClienteInput: {
          type: "object",
          required: ["nombre", "email"],
          properties: {
            nombre: { type: "string" },
            email: { type: "string" }
          }
        },
        Venta: {
          type: "object",
          properties: {
            _id: { type: "string", example: "652ac0f128d0a2c3456789cc" },
            clienteId: { type: "string", example: "652ab8f128d0a2c3456789aa" },
            productos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productoId: { type: "string", example: "652ab8f128d0a2c3456789ab" },
                  cantidad: { type: "integer", example: 2 }
                }
              }
            },
            total: { type: "number", example: 119.98 },
            fecha: { type: "string", format: "date-time", example: "2025-10-16T12:34:56.000Z" }
          }
        },
        VentaInput: {
          type: "object",
          required: ["clienteId", "productos", "total"],
          properties: {
            clienteId: { type: "string" },
            productos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productoId: { type: "string" },
                  cantidad: { type: "integer" }
                }
              }
            },
            total: { type: "number" }
          }
        }
      }
    }
  }
  