Login
Lo correcto es tener 3 tipos de accesos:
    1. Cliente final
        Hace pedidos
        Ve historial
        Administra su perfil
    2. Rider (repartidor)
        Ve pedidos asignados
        Marca entregados
        Ver ganancias por día
    3. Comercio (dueño)
        Admin panel
        Ve pedidos del día
        Administra productos
        Maneja estado del comercio
        Puede tener subusuarios internos (empleados del local)

El dueño siempre debe entrar como “comercio”.

Tenés dos opciones:
    Opción A — Un único login para el comercio
    El dueño accede con:
        email del comercio
        contraseña del comercio
    Y dentro del panel definís roles internos:
        admin → dueño
        empleado → solo puede ver pedidos
        manager → puede editar productos

  Opción B — Cada persona del comercio tiene su usuario
    Estructuras tu tabla así:
      Tabla: comercio_usuarios
      | id | comercio_id | nombre | email | rol | password |
    Roles:
      dueño
      empleado
      gerente

Más profesional
Escalable
Útil si el local tiene más empleados
