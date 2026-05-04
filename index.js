```javascript
const https = require('https');
const readline = require('readline');

// Configuración
const API_KEY = 'demo'; // Usando demo para NewsAPI
const BASE_URL = 'https://newsapi.org/v2/everything';

// Crear interfaz de línea de comandos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para realizar la búsqueda de noticias
function buscarNoticias(tema) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}?q=${encodeURIComponent(tema)}&sortBy=publishedAt&language=es&pageSize=10&apiKey=${API_KEY}`;
    
    https.get(url, (res) => {
      let datos = '';
      
      res.on('data', (chunk) => {
        datos += chunk;
      });
      
      res.on('end', () => {
        try {
          const respuesta = JSON.parse(datos);
          
          if (respuesta.status === 'ok') {
            resolve(respuesta.articles);
          } else if (respuesta.status === 'error') {
            // Si la API falla, usar datos de demostración
            const noticiasDemo = generarNoticiasDemo(tema);
            resolve(noticiasDemo);
          }
        } catch (err) {
          // En caso de error de parseo, usar datos demo
          const noticiasDemo = generarNoticiasDemo(tema);
          resolve(noticiasDemo);
        }
      });
    }).on('error', (err) => {
      // Si hay error de conexión, usar datos demo
      const noticiasDemo = generarNoticiasDemo(tema);
      resolve(noticiasDemo);
    });
  });
}

// Función para generar noticias de demostración
function generarNoticiasDemo(tema) {
  const fechaActual = new Date().toISOString();
  const noticiasDemo = [
    {
      source: { id: null, name: 'Demo News' },
      author: 'Redacción Demo',
      title: `Últimas noticias sobre ${tema} - Parte 1`,
      description: `Los expertos comentan sobre los últimos desarrollos relacionados con ${tema}. Esta es una noticia de demostración.`,
      url: 'https://example.com/noticia1',
      urlToImage: 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(tema),
      publishedAt: fechaActual,
      content: `Contenido completo sobre ${tema}...`
    },
    {
      source: { id: null, name: 'Demo News' },
      author: 'Corresponsal Demo',
      title: `${tema}: Análisis profundo de la situación actual`,
      description: `Un análisis detallado de cómo ${tema} afecta a la sociedad contemporánea.`,
      url: 'https://example.com/noticia2',
      urlToImage: 'https://via.placeholder.com/300x200?text=Analisis',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      content: `Análisis sobre ${tema}...`
    },
    {
      source: { id: null, name: 'Demo News' },
      author: 'Editor Demo',
      title: `${tema}: Lo que necesitas saber hoy`,
      description: `Resumen de los puntos clave sobre ${tema} que debes conocer.`,
      url: 'https://example.com/noticia3',
      urlToImage: 'https://via.placeholder.com/300x200?text=Resumen',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      content: `Puntos clave sobre ${tema}...`
    }
  ];
  
  return noticiasDemo;
}

// Función para mostrar las noticias formateadas
function mostrarNoticias(noticias, tema) {
  console.log('\n' + '='.repeat(80));
  console.log(`📰 RESULTADOS DE BÚSQUEDA: "${tema}"`);
  console.log('='.repeat(80) + '\n');
  
  if (noticias.length === 0) {
    console.log('❌ No se encontraron noticias para este tema.\n');
    return;
  }
  
  noticias.forEach((noticia, indice) => {
    console.log(`${indice + 1}. ${noticia.title}`);
    console.log(`   Fuente: ${noticia.source.name}`);
    console.log(`   Autor: ${noticia.author || 'No especificado'}`);
    console.log(`   Publicado: ${new Date(noticia.publishedAt).toLocaleString('es-ES')}`);
    console.log(`   Descripción: ${noticia.description || 'No disponible'}`);
    console.log(`   URL: ${noticia.url}`);
    console.log('-'.repeat(80) + '\n');
  });
}

// Función para mostrar el menú interactivo
function mostrarMenu() {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 BUSCADOR DE NOTICIAS - DEMOSTRACIÓN');
  console.log('='.repeat(80));
  console.log('\nOpciones disponibles:');
  console.log('  1. Buscar noticias por tema');
  console.log('  2. Buscar sobre tecnología');
  console.log('  3. Buscar sobre salud');
  console.log('  4. Buscar sobre deportes');
  console.log('  5. Salir');
  console.log('\n' + '='.repeat(80) + '\n');