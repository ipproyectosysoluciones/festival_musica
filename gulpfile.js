const { src, dest, watch } = require( 'gulp' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const plumber = require( 'gulp-plumber' );

/**
 * @name css-loader
 * @description Identificar, compilar y almacenar todos los archivos SCSS 
 * @param {*} done 
 */
function css ( done ) {
	
  src( 'src/scss/**/*.scss' ) // Identificar el archivo SASS
    .pipe( plumber() )
    .pipe( sass() ) // Compilarlo
    .pipe( dest( 'build/css' ) ); // Almacenarlo en el HardDisk

  done(); // Callback que avisa a gulp cuanta la functio finaliza
}

/**
 * @name dev-watch
 * @description Se encarga de estar pendiente de los cambios de las funciones
 * @param {*} done 
 */
function dev ( done ) {

  watch( 'src/scss/**/*.scss', css );

  done();
}

exports.css = css;
exports.dev = dev;
