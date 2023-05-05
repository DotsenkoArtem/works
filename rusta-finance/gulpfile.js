const gulp = require("gulp");
const debug = require("gulp-debug");
const del = require("del");
const imagemin = require("gulp-imagemin");

const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const webp = require("gulp-webp");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

const uglify = require("gulp-uglify");
const through2 = require("through2").obj;
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const combiner = require("stream-combiner2").obj;
const svgSprite = require("gulp-svg-sprite");

const spritesmith = require("gulp.spritesmith");
// ======== TEST ========
var buffer = require("vinyl-buffer");
var csso = require("gulp-csso");
var merge = require("merge-stream");
// ======== TEST ========
// const { src } = require('gulp');

const browserSync = require("browser-sync").create();
const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV == "development";

// КОНВЕРТИРОВАНИЕ TTF --> WOFF, СОХРАНЕНИЕ В PUBLIC/
gulp.task("ttf2woff", function () {
  return gulp
    .src("src/assets/**/*.ttf", { since: gulp.lastRun("ttf2woff") })
    .pipe(ttf2woff())
    .pipe(gulp.dest("public"));
});

// КОНВЕРТИРОВАНИЕ TTF --> WOFF2, СОХРАНЕНИЕ В PUBLIC/
gulp.task("ttf2woff2", function () {
  return gulp
    .src("src/assets/**/*.ttf", { since: gulp.lastRun("ttf2woff2") })
    .pipe(
      ttf2woff2({
        clone: true,
      })
    )
    .pipe(gulp.dest("public"));
});

// ПРОСТО КОПИРОВАНИЕ ШРИФТОВ .TTF В PUBLIC/
gulp.task("ttf", function () {
  return gulp
    .src("src/assets/**/*.ttf", { since: gulp.lastRun("ttf") })
    .pipe(gulp.dest("public"));
});

// КОНВЕРТИРОВАНИЕ ШРИФТОВ, КОПИРОВАНИЕ В PUBLIC/
gulp.task("fonts", gulp.parallel("ttf", "ttf2woff", "ttf2woff2"));

// ПРОСТО КОПИРОВАНИЕ PHP
gulp.task("php", function () {
  return gulp
    .src("src/php/**/*.*", { since: gulp.lastRun("php") })
    .pipe(gulp.dest("public/php/"));
});

// ПРОСТО КОПИРОВАНИЕ libs В КОРЕНЬ
gulp.task("libs", function () {
  return gulp
    .src("src/assets/libs/**/*.*", { since: gulp.lastRun("libs") })
    .pipe(gulp.dest("public/libs/"));
});

// ПРОСТО КОПИРОВАНИЕ ИКОНОК:SVG В ПАПКУ  СОХРАНЕНИЕМ СТРУКТУРЫ
gulp.task("sprite:svg", function () {
  return gulp
    .src("src/assets/img/icons/**/*.svg")
    .pipe(
      gulpIf(
        function (file) {
          return file;
        },

        svgSprite({
          mode: {
            css: {
              dest: ".",
              bust: false, //хеши в файле sprite.svg
              sprite: "sprite.svg", //имя файла from relative to dest
              layout: "vertical",
              // prefix:     '%',
              //dimensions: true,           //размеры картинки в одно классе с бэкграундом
              render: {
                scss: {
                  dest: "sprite-svg.scss",
                },
                // css: true
              },
            },
          },
        })
      )
    )
    .pipe(gulpIf("*.scss", gulp.dest("tmp/sass"), gulp.dest("public/css")));
});

// SPRITE:PNG
// gulp.task('sprite:png', function () {
//     return  gulp.src('src/assets/img/icons/**/*.png')
//             .pipe(spritesmith({
//                 imgName: 'sprite.png',
//                 cssName: 'sprite.css',
//                 algorithm: 'top-down',
//                 cssName: 'sprite-png.scss',
//               }))
//             .pipe(gulpIf('*.scss',
//                 gulp.dest('tmp/scss'),
//                 gulp.dest('public/css'))
//             );
//   });

// SPRITE:PNG
gulp.task("sprite:png", function () {
  // Generate our spritesheet
  var spriteData = gulp.src("src/assets/img/icons/**/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      algorithm: "top-down",
      cssName: "sprite-png.sass",
    })
  );

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest("public/css"));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css

    // ХУЙНЯ ЕБАНАЯ - УБИРАЕТ ПЕРЕМЕННЫЕ ИЗ SCSS
    //   .pipe(csso(
    //       {
    //         // restructure: false,
    //         // debug: true,
    //     }
    //   ))
    .pipe(gulp.dest("tmp/sass"));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

// ======== END of TEST ========

// КОНВЕРТИРОВАНИЕ PNG --> WEBP
gulp.task("webp", function () {
  return gulp
    .src([
      "src/assets/img/**/*.png",
      "!src/assets/img/icons/**/*.*",
      "!src/assets/img/favicons/**/*.*",
    ])
    .pipe(
      webp({
        // preset: 'photo',
        quality: 85,
      })
    )
    .pipe(gulp.dest("public/img"));
});

// КОПИРОВАНИЕ ИЗОБРАЖЕНИЙ (только дочерние файлы - без папок) и МИНИФИКАЦИЯ
gulp.task("imgmin", function () {
  return gulp
    .src(["src/assets/img/**/*.*", "!src/assets/img/icons/**/*.*"], {
      since: gulp.lastRun("img"),
    })
    .pipe(
      gulpIf(function (file) {
        return file.extname !== ".svg";
      }, imagemin([
        imageminPngquant(),
        imageminMozjpeg({ quality: 70, progressive: true }),
      ]))
    )
    .pipe(gulp.dest("public/img"));
});

// ИЗОБРАЖЕНИЯ: КОНВЕРТИРОВАНИЕ, МИНИИКАЦИЯ, КОПИРОВАНИЕ
gulp.task("img", gulp.series("imgmin", "webp"));

// ОБЩАЯ ЗАДАЧА ДЛЯ СОДЕРЖИМОГО "ASSETS" (FONTS, IMG, ICONS)
gulp.task("assets", gulp.parallel("fonts", "sprite:svg", "sprite:png", "img"));

// JS
gulp.task("js", function () {
  return combiner(
    gulp.src("src/js/**/*.js"),
    // Переименование и дублирование файла
    through2(function (file, enc, callback) {
      let fileDev = file.clone();
      fileDev.stem += ".dev";

      let fileDevMin = fileDev.clone();
      fileDevMin.stem += ".min";

      this.push(fileDev);
      this.push(fileDevMin);
      
      callback(null, file);
    }),
    gulpIf(function(file){
      return file.stem.includes(".dev");
    }, babel({
      presets: ["@babel/preset-env"],
    }),),
    
    gulpIf(function (file) {
      return file.stem.includes(".min");
    }, uglify()),
    gulp.dest("public/js")
  ).on(
    "error",
    notify.onError(function (err) {
      return {
        title: "Error: Java Script",
        message: err.message,
      };
    })
  );
});

// STYLES
gulp.task("styles", function () {
  return combiner(
    gulp.src("src/styles/sass/layout.sass"),
    gulpIf(isDevelopment, sourcemaps.init()),
    sass(),
    autoprefixer({
      cascade: false,
    }),
    // Переименование файла
    through2(function (file, enc, callback) {
      file.stem = "style";
      let fileMin = file.clone();
      fileMin.stem += ".min";
      this.push(fileMin);
      callback(null, file);
    }),
    gulpIf(isDevelopment, sourcemaps.write(".")),
    gulpIf(function (file) {
      return file.stem.includes(".min");
    }, cleanCSS({ compatibility: "ie8" })),
    gulp.dest("public/css")
  ).on(
    "error",
    notify.onError(function (err) {
      return {
        title: "Error: Styles",
        message: err.message,
      };
    })
  );
});

// PUG
gulp.task("pug", function () {
  return combiner(
    gulp.src("src/pug/pages/*.*"),
    gulpIf(function (file) {
      return file.extname == ".pug";
    }, pug({ pretty: true })),
    gulp.dest("public")
  ).on(
    "error",
    notify.onError(function (err) {
      return {
        title: "Error: pug",
        message: err.message,
      };
    })
  );
});

// НАБЛЮДЕНИЕ
gulp.task("watch", function () {
  gulp.watch("src/assets/fonts/", gulp.series("fonts"));
  gulp.watch("src/assets/img/icons/**/*.svg", gulp.series("sprite:svg"));
  gulp.watch("src/assets/img/icons/**/*.png", gulp.series("sprite:png"));
  gulp.watch(
    ["src/assets/img/**/*.*", "!src/assets/img/icons/**/*.svg"],
    gulp.series("img")
  );
  gulp.watch("src/js/**/*.*", gulp.series("js"));
  gulp.watch("src/styles/**/*.sass", gulp.series("styles"));
  gulp.watch("src/pug/**/*.*", gulp.series("pug"));
  gulp.watch("src/php/**/*.*", gulp.series("php"));
  gulp.watch("src/assets/libs/**/*.*", gulp.series("libs"));
});

gulp.task("serve", () => {
  browserSync.init({
    server: "public",
  });
  browserSync.watch("public/**/*.*").on("change", browserSync.reload);
});

// УДАЛЕНИЕ ПАПКИ PUBLIC
gulp.task("clean", function () {
  // return del(["public", "tmp"]);
  return del(["public/css", "public/img", "public/js", "public/libs", "public/php", "public/*.*", "tmp"]);
});

// ПОСТРОЕНИЕ
gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.series("assets", "js", "styles", "pug", "php", "libs")
  )
);

// РАЗРАБОТКА
gulp.task("dev:lite", gulp.series("build", gulp.parallel("watch")));
gulp.task("dev", gulp.series("build", gulp.parallel("watch", "serve")));
