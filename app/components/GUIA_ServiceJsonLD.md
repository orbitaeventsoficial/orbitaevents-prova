# 📘 GUÍA DE USO: ServiceJsonLD Mejorado

## 🎯 Casos de Uso

### Caso 1: Servicio Simple (Precio Único)
```tsx
<ServiceJsonLD
  name="DJ para Bodas Premium"
  slugPath="/servicios/bodas"
  description="DJ profesional con sonido EV y luces LED"
  serviceType={["DJ para bodas", "Sonido bodas"]}
  areaServed={["Barcelona", "Girona"]}
  priceFrom="1290"
  priceCurrency="EUR"
  aggregateRating={{
    ratingValue: 4.9,
    reviewCount: 87,
  }}
/>
```
**Resultado:** Google muestra "Desde 1.290€"

---

### Caso 2: Múltiples Paquetes (RECOMENDADO para conversión)
```tsx
<ServiceJsonLD
  name="Alquiler Equipo Audiovisual"
  slugPath="/servicios/alquiler"
  description="Alquiler profesional de sonido y luces"
  serviceType={["Alquiler sonido", "Alquiler luces"]}
  areaServed={["Barcelona", "Catalunya"]}
  priceFrom="150"
  priceCurrency="EUR"
  aggregateRating={{
    ratingValue: 4.9,
    reviewCount: 89,
  }}
  // 🔥 MÚLTIPLES OFERTAS
  offers={[
    {
      '@type': 'Offer',
      name: 'Pack Básico',
      price: '280',
      description: 'Sonido profesional para eventos pequeños',
    },
    {
      '@type': 'Offer',
      name: 'Pack Premium',
      price: '450',
      description: 'Sonido + luces LED completas',
    },
    {
      '@type': 'Offer',
      name: 'Pack VIP',
      price: '680',
      description: 'Todo incluido + tematización',
    },
  ]}
/>
```
**Resultado:** Google puede mostrar los 3 paquetes con precios diferentes

---

### Caso 3: Con URL específica por paquete
```tsx
offers={[
  {
    '@type': 'Offer',
    name: 'Pack Sonido Pro',
    price: '280',
    url: '/servicios/alquiler#pack-sonido',
    description: 'Fiestas pequeñas',
  },
  {
    '@type': 'Offer',
    name: 'Pack Luces LED',
    price: '220',
    url: '/servicios/alquiler#pack-luces',
    description: 'Iluminación profesional',
  },
]}
```
**Beneficio:** URLs específicas trackean qué paquete convierte más

---

## ⚡ Props Disponibles

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `name` | string | ✅ Sí | - | Nombre del servicio |
| `slugPath` | string | ✅ Sí | - | Ruta URL (ej: `/servicios/bodas`) |
| `description` | string | ✅ Sí | - | Descripción detallada |
| `serviceType` | string[] | ✅ Sí | - | Array de tipos de servicio |
| `areaServed` | string[] | ✅ Sí | - | Zonas geográficas servidas |
| `priceFrom` | string | ⚠️ Opcional* | - | Precio mínimo (solo si no usas `offers`) |
| `priceCurrency` | string | ❌ No | "EUR" | Moneda |
| `availability` | string | ❌ No | "InStock" | Disponibilidad |
| `aggregateRating` | object | ⚠️ Recomendado | - | Rating + número reviews |
| `offers` | array | ⚠️ Opcional | - | Array de ofertas múltiples |

*Si usas `offers`, no necesitas `priceFrom`. Si usas `priceFrom`, no necesitas `offers`.

---

## 🎨 Ejemplos por Tipo de Servicio

### Para Bodas (Precio Fijo)
```tsx
<ServiceJsonLD
  name="DJ Bodas Premium Barcelona"
  slugPath="/servicios/bodas"
  description="DJ profesional + Sonido EV 4000W + Luces LED + Efectos especiales"
  serviceType={[
    "DJ para bodas",
    "Sonido bodas",
    "Iluminación bodas",
    "Efectos especiales bodas"
  ]}
  areaServed={["Barcelona", "Girona", "Tarragona", "Lleida"]}
  priceFrom="1290"
  aggregateRating={{ ratingValue: 4.9, reviewCount: 87 }}
/>
```

### Para Discomóvil (Múltiples Opciones)
```tsx
<ServiceJsonLD
  name="Discomóvil Profesional"
  slugPath="/servicios/discomobil"
  description="Discomóvil con DJ, sonido profesional y luces LED"
  serviceType={["Discomóvil", "DJ fiestas", "Animación musical"]}
  areaServed={["Barcelona", "Girona", "Tarragona"]}
  priceFrom="490"
  aggregateRating={{ ratingValue: 4.8, reviewCount: 156 }}
  offers={[
    {
      '@type': 'Offer',
      name: 'Discomóvil Esencial',
      price: '490',
      description: '4 horas · DJ + Sonido + Luces básicas',
    },
    {
      '@type': 'Offer',
      name: 'Discomóvil Premium',
      price: '790',
      description: '6 horas · DJ + Sonido Pro + Show luces',
    },
  ]}
/>
```

### Para Empresas (Personalizado)
```tsx
<ServiceJsonLD
  name="DJ Eventos Corporativos"
  slugPath="/servicios/empresas"
  description="Servicios audiovisuales para eventos empresariales"
  serviceType={[
    "DJ eventos corporativos",
    "Sonido conferencias",
    "Producción eventos empresa"
  ]}
  areaServed={["Barcelona", "Madrid", "Valencia"]}
  priceFrom="690"
  aggregateRating={{ ratingValue: 5.0, reviewCount: 34 }}
/>
```

---

## 🎯 Mejores Prácticas

### ✅ DO (Haz esto)
- Usa `offers` cuando tengas 2-4 paquetes diferentes
- Pon `priceFrom` con el precio más bajo cuando tengas un rango
- Incluye SIEMPRE `aggregateRating` si tienes reviews
- Usa `serviceType` con 3-5 variaciones de keywords
- Pon ciudades específicas en `areaServed`, no solo provincias
- Describe beneficios específicos en cada oferta

### ❌ DON'T (No hagas esto)
- No uses `offers` Y `priceFrom` al mismo tiempo (elige uno)
- No pongas más de 5 ofertas (abruma al usuario)
- No uses precios muy altos en `priceFrom` (espanta)
- No olvides el rating (da credibilidad)
- No uses `serviceType` genéricos ("servicios", "eventos")
- No repitas la misma descripción en todas las ofertas

---

## 🔍 Cómo Verificar que Funciona

### 1. Valida Schema.org
```
https://search.google.com/test/rich-results
```
Pega la URL de tu página y verifica que muestre:
- ✅ Service schema válido
- ✅ Offers con precios
- ✅ AggregateRating visible

### 2. Inspecciona en DevTools
```javascript
// En el navegador, busca:
document.querySelector('script[type="application/ld+json"]')
```
Deberías ver tu estructura JSON-LD completa

### 3. Google Search Console
- Espera 3-7 días después de publicar
- Ve a "Enhancements" → "Unparsed structured data"
- Verifica que no hay errores

---

## 🚀 Impacto SEO y Conversión

### Rich Results en Google
Cuando todo está bien configurado, Google puede mostrar:
- ⭐ Rating con estrellas
- 💰 Precio "Desde X€"
- 📦 Múltiples opciones de paquetes
- 📍 Zona geográfica servida
- 🔄 Disponibilidad

### Aumenta CTR
Estudios demuestran que rich results aumentan CTR:
- Con estrellas: **+15-20% CTR**
- Con precio: **+10-15% CTR**
- Con ambos: **+25-35% CTR**

### Psicología de Múltiples Ofertas
Cuando muestras 3 paquetes:
- 60% de usuarios eligen el medio (efecto Goldilocks)
- 25% eligen el premium (anchor pricing)
- 15% eligen el básico

**Sin opciones:** Usuario piensa "¿lo compro?"
**Con opciones:** Usuario piensa "¿cuál compro?" ← Más conversión

---

## 🎓 Casos de Uso Avanzados

### Ofertas con Disponibilidad Limitada
```tsx
offers={[
  {
    '@type': 'Offer',
    name: 'Pack Verano 2025',
    price: '990',
    availability: 'https://schema.org/LimitedAvailability',
    description: 'Solo quedan 3 fechas en agosto',
  },
]}
```

### Descuentos Temporales
```tsx
offers={[
  {
    '@type': 'Offer',
    name: 'Pack Bodas Early Bird',
    price: '1190',
    description: 'Precio especial reservas con +6 meses antelación',
  },
  {
    '@type': 'Offer',
    name: 'Pack Bodas Estándar',
    price: '1390',
    description: 'Precio normal',
  },
]}
```

---

## 📊 A/B Testing Recomendado

### Test 1: Precio Único vs Múltiples Ofertas
- **Grupo A:** Solo `priceFrom="1290"`
- **Grupo B:** 3 ofertas (1290, 1590, 1990)
- **Métrica:** Conversión landing → WhatsApp
- **Hipótesis:** Grupo B convierte +20%

### Test 2: Nombres de Paquetes
- **Grupo A:** "Básico, Premium, VIP"
- **Grupo B:** "Esencial, Completo, Total"
- **Métrica:** Clicks en cada paquete
- **Hipótesis:** "Completo" vende más que "Premium"

---

## 💡 Tips Finales

1. **Actualiza ratings regularmente**
   - Cada 10 nuevos eventos, actualiza `reviewCount`
   - Mantén `ratingValue` realista (4.8-5.0)

2. **Sincroniza con tu pricing real**
   - Si subes precios, actualiza inmediatamente
   - No pongas precios engañosos (Google penaliza)

3. **Usa el mismo Schema en toda tu web**
   - Misma estructura para todos los servicios
   - Facilita el mantenimiento

4. **Combina con FAQ Schema**
   - ServiceJsonLD + FAQ Schema = Rich results dobles
   - Más espacio en Google = Más clicks

---

🔥 **¡Ahora a vender más con Schema.org!** 🔥
