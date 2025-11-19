# 🎨 GUÍA DE MIGRACIÓN - BRANDING ÓRBITA EVENTS

## 🔥 CAMBIOS GLOBALES NECESARIOS

Los configuradores que te envié usan colores genéricos. Aquí está el mapeo EXACTO para usar tus colores branded:

---

## 📊 TABLA DE CONVERSIÓN DE COLORES

### Reemplazos en clases Tailwind:

| Color Genérico | → | Color Branded Órbita |
|----------------|---|---------------------|
| `bg-purple-900/20` | → | `bg-bg-surface` |
| `bg-purple-500/10` | → | `bg-oe-gold/5` |
| `border-purple-500/30` | → | `border-oe-gold/30` |
| `border-purple-500` | → | `border-oe-gold` |
| `bg-purple-500` | → | `bg-oe-gold` |
| `text-purple-400` | → | `text-oe-gold` |
| `text-purple-300` | → | `text-oe-gold-light` |
| `shadow-purple-500/20` | → | `shadow-oe-gold` |
| | | |
| `bg-amber-500/20` | → | `bg-oe-gold/20` |
| `border-amber-500` | → | `border-oe-gold` |
| `bg-amber-500` | → | `bg-oe-gold` |
| `text-amber-500` | → | `text-oe-gold` |
| `text-amber-400` | → | `text-oe-gold-light` |
| | | |
| `bg-orange-600` | → | `bg-oe-gold` |
| `bg-orange-500` | → | `bg-oe-gold` |
| `text-orange-400` | → | `text-oe-gold` |
| `text-orange-600` | → | `text-oe-gold-dark` |
| | | |
| `bg-blue-500` | → | `bg-oe-gold` |
| `text-blue-400` | → | `text-oe-gold` |
| `border-blue-500` | → | `border-oe-gold` |
| | | |
| `bg-white/5` | → | `bg-bg-surface` |
| `bg-white/10` | → | `bg-bg-card` |
| `border-white/10` | → | `border` |
| `border-white/20` | → | `border-hover` |

---

## 🔧 MÉTODO DE APLICACIÓN (FIND & REPLACE)

### 1️⃣ En tu editor (VSCode recomendado):

```bash
# Abrir todos los archivos *-client*.tsx
# Buscar y reemplazar (Ctrl+Shift+H):

# PURPLES → GOLD
from-purple-900/20 to-pink-900/20    →  from-oe-gold/5 to-oe-gold-dark/10
bg-purple-900/20                      →  bg-oe-gold/5
bg-purple-500/10                      →  bg-oe-gold/10
border-purple-500/30                  →  border-oe-gold/30
border-purple-500                     →  border-oe-gold
bg-purple-500                         →  bg-oe-gold
text-purple-400                       →  text-oe-gold
text-purple-300                       →  text-oe-gold-light
shadow-purple-500/20                  →  shadow-oe-gold

# AMBERS → GOLD
bg-amber-500/20                       →  bg-oe-gold/20
bg-amber-500/5                        →  bg-oe-gold/5
bg-amber-500                          →  bg-oe-gold
border-amber-500                      →  border-oe-gold
text-amber-500                        →  text-oe-gold
text-amber-400                        →  text-oe-gold-light
shadow-amber-500/20                   →  shadow-oe-gold

# ORANGES → GOLD
from-orange-600 to-red-600            →  from-oe-gold to-oe-gold-dark
from-orange-600 to-pink-600           →  from-oe-gold to-oe-gold-light
bg-orange-900/20                      →  bg-oe-gold/5
bg-orange-600                         →  bg-oe-gold
bg-orange-500                         →  bg-oe-gold
text-orange-400                       →  text-oe-gold
text-orange-600                       →  text-oe-gold-dark
border-orange-500                     →  border-oe-gold

# BLUES → GOLD (para empresas)
from-blue-600 to-indigo-600           →  from-oe-gold to-oe-gold-dark
from-indigo-900/20 to-blue-900/20     →  from-oe-gold/5 to-oe-gold-dark/10
bg-blue-500                           →  bg-oe-gold
text-blue-400                         →  text-oe-gold
border-blue-500                       →  border-oe-gold

# GENERICS → BRANDED
bg-white/5                            →  bg-bg-surface
bg-white/10                           →  bg-bg-card
border-white/10                       →  border
border-white/20                       →  border-hover
```

---

## 📝 CAMBIOS ESPECÍFICOS POR ARCHIVO

### ✅ alquiler-client.tsx
- ✅ Ya usa colores genéricos neutros
- Cambiar solo: `from-amber-500 to-orange-500` → `from-oe-gold to-oe-gold-light`
- Sticky bar: mantener el degradado dorado

### ✅ fiestas-client.tsx
- ✅ Ya tiene Oferta Flash con colores amber/orange
- Cambiar todos los `amber-*` y `purple-*` → `oe-gold-*`
- Slider: usar clase `slider-custom` (ya usa colores branded)

### 🆕 bodas-client-v2.tsx
```typescript
// ANTES (genérico):
className="border-purple-500 bg-purple-500/10"

// DESPUÉS (branded):
className="border-oe-gold bg-oe-gold/10"
```

**Reemplazos completos:**
- `purple-*` → `oe-gold-*`
- `pink-*` → `oe-gold-light-*`
- `from-purple-600 to-pink-600` → `from-oe-gold to-oe-gold-light`

### 🆕 discomovil-client-v2.tsx
```typescript
// ANTES:
className="border-orange-500 bg-orange-500/10"

// DESPUÉS:
className="border-oe-gold bg-oe-gold/10"
```

**Reemplazos completos:**
- `orange-*` → `oe-gold-*`
- `red-*` → `oe-gold-dark-*`
- `from-orange-600 to-red-600` → `from-oe-gold to-oe-gold-dark`

### 🆕 empresas-client-v2.tsx
```typescript
// ANTES:
className="border-blue-500 bg-blue-500/10"

// DESPUÉS:
className="border-oe-gold bg-oe-gold/10"
```

**Reemplazos completos:**
- `blue-*` → `oe-gold-*`
- `indigo-*` → `oe-gold-dark-*`
- `from-blue-600 to-indigo-600` → `from-oe-gold to-oe-gold-dark`

### 🆕 produccion-client-v2.tsx ⭐
```typescript
// ANTES:
className="border-purple-500 bg-purple-500/10"

// DESPUÉS:
className="border-oe-gold bg-oe-gold/10"
```

**Reemplazos completos:**
- `purple-*` → `oe-gold-*`
- `pink-*` → `oe-gold-light-*`
- Mantener colores de categorías pero con accent dorado

---

## 🎨 USAR CLASES BRANDED EXISTENTES

### En lugar de crear botones custom, usar tus clases:

```typescript
// ❌ ANTES (genérico):
className="px-8 py-4 bg-purple-500 rounded-full"

// ✅ DESPUÉS (branded):
className="oe-btn-gold px-8 py-4"
```

### Usar tus utilidades:

```typescript
// Textos con glow
className="gradient-text-gold"  // Ya está en tu globals.css

// Cards
className="oe-card"  // Ya está en tu globals.css

// Botones
className="oe-btn-gold"  // Botón dorado principal
className="oe-btn-outline"  // Botón outline dorado
```

---

## ⚡ SCRIPT AUTOMÁTICO (BASH)

Si quieres automatizar todo, crea este script:

```bash
#!/bin/bash
# migrate-colors.sh

FILES="app/servicios/**/client.tsx"

for file in $FILES; do
  echo "Procesando: $file"
  
  # Purples → Gold
  sed -i 's/from-purple-900\/20 to-pink-900\/20/from-oe-gold\/5 to-oe-gold-dark\/10/g' "$file"
  sed -i 's/bg-purple-500\/10/bg-oe-gold\/10/g' "$file"
  sed -i 's/border-purple-500/border-oe-gold/g' "$file"
  sed -i 's/bg-purple-500/bg-oe-gold/g' "$file"
  sed -i 's/text-purple-400/text-oe-gold/g' "$file"
  
  # Ambers → Gold
  sed -i 's/bg-amber-500/bg-oe-gold/g' "$file"
  sed -i 's/text-amber-500/text-oe-gold/g' "$file"
  sed -i 's/border-amber-500/border-oe-gold/g' "$file"
  
  # Oranges → Gold
  sed -i 's/from-orange-600 to-red-600/from-oe-gold to-oe-gold-dark/g' "$file"
  sed -i 's/bg-orange-600/bg-oe-gold/g' "$file"
  sed -i 's/text-orange-400/text-oe-gold/g' "$file"
  
  # Blues → Gold
  sed -i 's/from-blue-600 to-indigo-600/from-oe-gold to-oe-gold-dark/g' "$file"
  sed -i 's/bg-blue-500/bg-oe-gold/g' "$file"
  sed -i 's/text-blue-400/text-oe-gold/g' "$file"
  
  # Generics
  sed -i 's/bg-white\/5/bg-bg-surface/g' "$file"
  sed -i 's/bg-white\/10/bg-bg-card/g' "$file"
  sed -i 's/border-white\/10/border/g' "$file"
  
  echo "✓ Completado: $file"
done

echo "🔥 Migración completada!"
```

**Uso:**
```bash
chmod +x migrate-colors.sh
./migrate-colors.sh
```

---

## 📋 CHECKLIST DE MIGRACIÓN

### Paso 1: Preparación
- [ ] Hacer backup de `/app/servicios/`
- [ ] Copiar slider-styles-branded.css a proyecto
- [ ] Abrir todos los `*-client*.tsx` en editor

### Paso 2: Aplicar cambios
- [ ] Ejecutar script automático O
- [ ] Hacer find & replace manual (tabla arriba)
- [ ] Verificar que no queden colores genéricos

### Paso 3: Actualizar CSS
- [ ] Reemplazar slider-styles.css con slider-styles-branded.css
- [ ] O añadir slider-styles-branded.css al final de globals.css

### Paso 4: Testing
- [ ] Build local: `pnpm run build`
- [ ] Verificar cada configurador visualmente
- [ ] Verificar slider (debe ser dorado Órbita)
- [ ] Verificar botones (deben usar oe-gold)
- [ ] Verificar bordes y fondos

### Paso 5: Deploy
- [ ] `rm -rf .next`
- [ ] `vercel --prod`
- [ ] Testear en producción
- [ ] Verificar en móvil

---

## 🎯 RESULTADO FINAL

Después de aplicar todos los cambios, TODOS los configuradores usarán:

✅ **Dorado Órbita** (#d7b86e) como color principal
✅ **Backgrounds branded** (#0a0a0b, #111214)
✅ **Clases de utilidad** (.oe-btn-gold, .oe-card)
✅ **Slider dorado** con glow y animaciones branded
✅ **Gradientes branded** (gold-light → gold → gold-dark)
✅ **Sistema de diseño consistente** en toda la web

---

## 💡 TIPS IMPORTANTES

1. **No cambies colores de estado:**
   - `green-*` (descuentos) → Mantener verde
   - `red-*` (errores) → Mantener rojo
   - Estos son semánticos, no de marca

2. **Badges especiales:**
   - "MÁS POPULAR" → Usar `bg-oe-gold` con `text-black`
   - "RECOMENDADO" → Usar `bg-oe-gold-light`
   - "PREMIUM" → Usar gradiente `from-oe-gold to-oe-gold-bright`

3. **Sticky bars:**
   - Siempre usar: `from-oe-gold to-oe-gold-light`
   - Texto: `text-black` (contraste perfecto)

---

## 🔥 ATAJOS DE TECLADO (VSCode)

```
Ctrl+Shift+H        → Find & Replace en múltiples archivos
Ctrl+H              → Find & Replace en archivo actual
Ctrl+Shift+F        → Buscar en todo el proyecto
Alt+Enter           → Seleccionar todas las coincidencias
```

---

**¡Con esto tienes TODA tu web branded al 100% con los colores de Órbita Events!** 🚀💎
