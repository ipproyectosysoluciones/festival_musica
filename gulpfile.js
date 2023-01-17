const { src, dest, watch, parallel } = require( 'gulp' );

/* CSS */
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const plumber = require( 'gulp-plumber' );

/* Imágenes */
const cache = require( 'gulp-cache' );
const imagemin = require( 'gulp-imagemin' );
const webp = require( 'gulp-webp' );
// const avif = require( 'gulp-avif' );

/**
 * @name css-loader
 * @description Identificar, compilar y almacenar todos los archivos SCSS
 * @param {*} done
 */
function css (done) {
  src( 'src/scss/**/*.scss' ) // Identificar el archivo SASS
    .pipe( plumber() )
    .pipe( sass() ) // Compilarlo
    .pipe( dest( 'build/css' ) ); // Almacenarlo en el HardDisk

  done(); // Callback que avisa a gulp cuanta la functio finaliza
}

/**
 * @name imagenes
 * @description Aligerar imágenes
 * @param {*} done
 */
function imagenes ( done ) {
  const opciones = {
    optimizationLevel: 3,
  };
  src( 'src/img/**/*.{png,jpg}' )
    // @ts-ignore
    .pipe( cache( imagemin( opciones ) ) )
    .pipe( dest( 'build/img' ) );

  done();
}

/**
 * @name versionWebp
 * @description Cambiar las imágenes a formato webp
 * @param {*} done
 */
function versionWebp ( done ) {
  const opciones = {
    quality: 50,
  };
  src( 'src/img/**/*.{png,jpg}' )
    .pipe( webp( opciones ) )
    .pipe( dest( 'build/img' ) );
  
  done();
}

/**
 * @name versionAvif
 * @description Cambiar las imágenes a formato avif
 * @param {*} done 
 */
// function versionAvif ( done ) {
//   const opciones = {
//     quality: 50,
//   };
//   src( 'src/img/**/*.{png,jpg}' )
//     .pipe( avif( opciones ) )
//     .pipe( dest( 'build/img' ) );
  
//   done();
// }

/**
 * @name dev-watch
 * @description Se encarga de estar pendiente de los cambios de las funciones
 * @param {*} done
 */
function dev (done) {
  watch( 'src/scss/**/*.scss', css );

  done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, dev );
