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


 Implementación Completada
1. Sistema de Autenticación Multi-Rol
    AuthContext.jsx actualizado con 5 roles:
    👤 Usuario (Comprador) - accede a tienda y compra
    🏪 Comercio (Vendedor) - gestiona sus productos y pedidos
    🚴 Delivery (Repartidor) - recibe órdenes y entrega
    📋 Aseguradora - controla documentación de motos
    ⚙️ Admin - gestiona todo el sistema
2. Login Mejorado
        Selector de rol con 5 botones visuales (emojis incluidos)
        Credenciales de demo por rol para probar:
        admin1 / 1234 (Admin)
        comercio1 / 1234 (Comercio)
        delivery1 / 1234 (Delivery)
        usuario / 1234 (Usuario)
        aseguradora1 / 1234 (Aseguradora)
        Botón "Usar datos de demo" para facilitar pruebas
3. Dashboards Específicos por Rol
        🏪 Dashboard Comercio (/dashboard-comercio)
        Listado de productos con precio y stock
        Tabla de pedidos recibidos
        Estadísticas de ventas
        Botones para editar/eliminar productos
🚴 Dashboard Delivery (/dashboard-delivery)
        Geolocalizacion en tiempo real (Geolocation API)
        Actualización automática cada 60 segundos (1 minuto)
        Muestra latitud, longitud y hora de actualización
        Enlace directo a Google Maps
        Tabla de órdenes activas
        Estadísticas diarias (entregas, ganancia, calificación)
📋 Dashboard Aseguradora (/dashboard-aseguradora)
    Control de motos del delivery con placas
    Estado de documentación (Completo/Incompleto/Por renovar)
    Tabla de vencimientos
    Sección para subir documentos
    Alertas automáticas de vencimiento
Control de 4 tipos de documentos requeridos
🛍️ Dashboard Usuario (/dashboard-usuario)
    Panel de comprador con acceso a carrito
    Historial de órdenes con estado
    Información de cuenta
    Gestión de direcciones de envío
    Botón para continuar comprando
4. Redirecciones Automáticas
    Cada rol se redirige automáticamente a su dashboard después del login:

        Admin → /admin
        Comercio → /dashboard-comercio
        Delivery → /dashboard-delivery
        Usuario → /dashboard-usuario
        Aseguradora → /dashboard-aseguradora
5. Estilos Profesionales
    Diseño responsivo (funciona en móvil y desktop)
    Colores consistentes con tu paleta (#4A342E, #c7a17a, etc.)
    Tablas, tarjetas de estadísticas y alertas estilizadas
    Animaciones suaves en botones y hover


Perfecto — lo veo claro y puedo ayudarte a conectar el frontend con tu backend Java. Primero unas comprobaciones rápidas y después te doy un plan con pasos concretos y fragmentos de código listos para pegar.

Resumen rápido (qué necesito)

Confirmar si el repo backend es público o privado. El enlace que diste parece no exponer el README por fetch automático; si es privado tendrás que darme acceso o pegar el README/archivo de configuración (o indicarme los endpoints principales).
Saber cómo arrancas el backend localmente (Maven: mvn spring-boot:run, Gradle, JAR, puerto por defecto, etc.).
Confirmar si el backend ya devuelve JWT u otro mecanismo de autenticación (o si aún hay que implementarlo).
Plan propuesto (pasos a realizar)

Verificar/arrancar backend localmente y anotar la URL base (ej. http://localhost:8080).
Configurar CORS en el backend para permitir http://localhost:5173 (dev) y la URL de producción.
Exponer un contrato mínimo de API (endpoints usados por frontend): auth, productos, pedidos, delivery/location, aseguradora, etc.
Configurar frontend para usar la URL del API:
Añadir variable de entorno VITE_API_BASE y/o proxy en vite.config.js.
Actualizar AuthContext para autenticar contra el backend (POST /api/auth/login), guardar token (localStorage) y exponer headers autorizados.
Actualizar RutaProtegida para validar token/rol con backend o usando claims del JWT.
Cambiar los dashboards para consumir endpoints reales (fetch GET/POST).
Delivery: implementar envío de posición cada 1 minuto al endpoint /api/delivery/location y (opcional) recibir actualizaciones por WebSocket/SSE.
Testeo end-to-end y ajustes de CORS/headers.
Acciones que puedo hacer ahora (elige)

A. Intento clonar y revisar automáticamente el repo backend si es público.
B. Si es privado, pásame el README o los endpoints principales (o dame acceso) y yo preparo los cambios en el frontend.
C. Empiezo ya a aplicar en tu frontend los cambios necesarios (AuthContext/Env/proxy/ejemplos de fetch), y tú luego cambias la URL base cuando arranques el backend.
Ejemplos prácticos (código listo para integrar)

Añadir variable de entorno en frontend (archivo .env en root):
VITE_API_BASE=http://localhost:8080/api

Proxy en vite.config.js (opcional, útil en dev):

    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
        }
        }
    }
    })

3.Wrapper fetch para incluir token automáticamente (nuevo archivo src/utils/api.js):

        export const API_BASE = import.meta.env.VITE_API_BASE || '/api'

        export async function apiFetch(path, options = {}) {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers
        })

        if (!res.ok) {
            const err = await res.json().catch(()=>({ message: res.statusText }))
            throw err
        }

        return res.json().catch(()=>null)
        }

4.Login en AuthContext (ejemplo de reemplazo):

        // login(nombre, password, rol)
        const login = async (nombre, password, rol) => {
        try {
            const body = { username: nombre, password, role: rol }
            const data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(body) })
            // backend debe devolver { token, user: { id, nombre, rol, ... } }
            localStorage.setItem('token', data.token)
            setUsuario(data.user)
            setRolSeleccionado(data.user.rol)
            return { ok: true, rol: data.user.rol }
        } catch (err) {
            return { ok: false, mensaje: err.message || 'Error en login' }
        }
        }

5.Logout:

        const logout = () => {
        localStorage.removeItem('token')
        setUsuario(null)
        setRolSeleccionado(null)
        }

6.RutaProtegida: comprobar role desde AuthContext o 
        validar token en backend (recomiendo backend endpoint /auth/me que devuelva user+roles):

        // ejemplo en useEffect de AuthContext al cargar
        useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return
        apiFetch('/auth/me').then(data => setUsuario(data.user)).catch(()=>logout())
        }, [])

7.Delivery: enviar ubicación cada 60s al backend:

        function enviarUbicacion(lat, lng) {
        return apiFetch('/delivery/location', {
            method: 'POST',
            body: JSON.stringify({ lat, lng, timestamp: Date.now() })
        })
        }

        // en DashboardDelivery useEffect
        const obtenerUbicacion = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude
            const lng = pos.coords.longitude
            setUbicacion({ lat, lng })
            enviarUbicacion(lat, lng).catch(console.warn)
        })
        }

Sugerencias sobre el backend (necesario)

Endpoint de login: POST /api/auth/login → devuelve JWT y datos de usuario.
Endpoint para validar token: GET /api/auth/me.
Rutas protegidas por rol: usar Spring Security con roles ROLE_ADMIN, ROLE_COMERCIO, ROLE_DELIVERY, ROLE_USUARIO, ROLE_ASEGURADORA.
Habilitar CORS (ejemplo Spring Boot):
        @Bean
        public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "https://tu-dominio.com")
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowCredentials(true);
            }
        };
        }

Endpoint delivery location: POST /api/delivery/{id}/location o /api/delivery/location si el backend obtiene el delivery por token.
Qué haré si me das acceso al repo backend (opcional)

Clonar el backend y revisar application.properties/security config y los controladores.
Identificar endpoints y tipos de respuesta para adaptar apiFetch y AuthContext.
Probar login contra backend y ajustar frontend automáticamente.
Proponer cambios mínimos en backend si faltan endpoints (ej. /auth/me, CORS).
Siguiente paso recomendado ahora

Si quieres que empiece ya, dime cuál de las opciones:
Me das URL pública del repo (o lo hago si puedes hacerlo público por un rato).
Pegas aquí el README o los archivos relevantes (p. ej. application.properties, SecurityConfig, controladores AuthController) para que los inspeccione.
Prefieres que yo aplique los cambios en el frontend (AuthContext + apiFetch + Vite proxy + ejemplos) ahora para que luego solo apuntes la VITE_API_BASE al backend real.
Dime cómo quieres proceder y lo hago (puedo empezar por aplicar los cambios en el frontend y dejar el backend como “to be connected” si prefieres trabajar paso a paso).