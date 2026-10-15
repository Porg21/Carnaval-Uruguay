# Carnaval Uruguay — Manager

Prototipo jugable **v0.2** de un simulador para un jugador basado en la gestión de un conjunto del Carnaval uruguayo.

## v0.2

- Cuentas reales con usuario, email privado y contraseña mediante Supabase Auth.
- Partidas guardadas online por usuario, con Row Level Security.
- Directorio **Conjuntos** dividido por las cinco categorías.
- Plantillas completas de los demás conjuntos, incluidos artistas y profesionales.
- Prestigio, popularidad, situación económica aproximada, historial y premios por conjunto.
- Desde enero, estimación aproximada del nivel de los espectáculos rivales.
- Titulares y suplentes fijos; solo los titulares influyen en el espectáculo.
- Cambios de formación con impacto en rodaje según experiencia.
- Mercado con filtros, favoritos y notificaciones.
- Negociaciones de varias rondas con contraofertas concretas.
- Sección **Actualidad** con fichajes, salidas e intentos fallidos sin revelar montos de terceros.
- Bandeja privada por Mercado, Plantel, Competición y Administración.
- Profesionales con atributos, experiencia, prestigio, historial y premios.
- Profesionales compartidos entre categorías, con máximo uno por categoría y sistema de **Concentración**.
- Sistema de **Química con el conjunto**, capaz de elevar el rendimiento efectivo por encima de 100.
- Ensayos de tres partes, progreso numérico exacto, explicaciones y evolución del trabajo creativo.
- Pestaña **Actualizaciones** con las notas de cada versión dentro del juego.

## Alcance actual

La v0.2 amplía la gestión de abril a enero. El motor completo de febrero, tablados, Concurso Oficial, jurados por rubro, Liguilla, Fallos y Ronda de Ganadores sigue previsto para versiones posteriores.

## Publicación

El frontend se publica con GitHub Pages desde la rama `main`. La autenticación y el guardado online usan Supabase.