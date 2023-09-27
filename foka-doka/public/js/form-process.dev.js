"use strict";

// F O R M S   P R O C E S S I N G

var sounds = {
  success: "php/audio/success.mp3",
  error: "php/audio/error-1.mp3"
};
var soundSuccess = new Sound(sounds.success);
var soundError = new Sound(sounds.error);
var alertSound = soundSuccess;
function Sound(src) {
  var audio = document.createElement("audio");
  audio.src = src;
  this.play = function () {
    audio.play();
  };
}

// Массив всех форм
var forms = Array.from(document.forms);
forms.forEach(function (form) {
  var inputTypeFile = form.querySelector('input[type="file"]');
  var selectedFile = inputTypeFile.nextElementSibling;
  inputTypeFile.addEventListener("change", function () {
    if (this.files.length == 1) {
      selectedFile.innerHTML = "<div class=\"form__file_selected-label\">\u0412\u044B\u0431\u0440\u0430\u043D \u0444\u0430\u0439\u043B: </div><div class=\"form__file_selected-value\">".concat(this.files[0].name, "</div>");
    }
    if (this.files.length > 1) {
      selectedFile.innerHTML = "<div class=\"form__file_selected-label\">\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0444\u0430\u0439\u043B\u043E\u0432: </div><div class=\"form__file_selected-value\">".concat(this.files.length, "</div>");
    }
  });
  form.addEventListener("submit", function (event) {
    send(event, "../php/send-order.php");
  });
  function send(event, php) {
    // Установка лоадера
    setupLoader(form);
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open("POST", php, true);
    req.onload = function () {
      // Определение переменных для оповещения
      var thanks = document.createElement("div");
      var thanksContent = document.createElement("div");
      var thanksClose = document.createElement("div");
      var thanksBackdrop = document.createElement("div");
      thanksBackdrop.className = "thanks__backdrop";
      var messageSuccessful = "<div class=\"thanks__title\"><span class=\"text_accent-prim\">\u0421\u043F\u0430\u0441\u0438\u0431\u043E,</span> \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D!</div><div class=\"thanks__subtitle\">\u0412 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0441 \u0432\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442</div>";
      var limitExceeded = "<div class=\"thanks__title\"><span class=\"text_accent-prim\">\u041E\u0448\u0438\u0431\u043A\u0430.</span></div><div class=\"thanks__subtitle\">\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u044F\u0435\u043C\u044B\u0445 \u0444\u0430\u0439\u043B\u043E\u0432 (10\u043C\u0431).</div>";
      var messageError = "<div class=\"thanks__title\"><span class=\"text_accent-prim\">\u041E\u0448\u0438\u0431\u043A\u0430.</span></div><div class=\"thanks__subtitle\">\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E.</div>";

      // Установка окна оповещения
      setupThanks();
      function setupThanks() {
        thanks.className = "thanks";
        thanksContent.className = "thanks__content";
        thanksClose.className = "thanks__close";
        thanks.append(thanksContent, thanksClose);
        wrapper.append(thanks);
        thanks.before(thanksBackdrop);
        // Закрытие окна оповещения
        thanksClose.onclick = function () {
          removeThanks();
        };
      }

      // Удаление лоадера
      removeLoader(form);
      if (req.status >= 200 && req.status < 400) {
        var json = JSON.parse(this.response);

        // ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          thanksContent.innerHTML = messageSuccessful;
          thanks.classList.remove("thanks_error");
          thanks.classList.add("thanks_success");
          alertSound = soundSuccess;
        } else if (json.result == "limitExceeded") {
          // Превышен максимальный размер прикрепляемых файлов (10мб)
          thanksContent.innerHTML = limitExceeded;
          thanks.classList.remove("thanks_success");
          thanks.classList.add("thanks_error");
          alertSound = soundError;
        } else {
          // Ошибка. Сообщение не отправлено
          thanksContent.innerHTML = messageError;
          thanks.classList.remove("thanks_success");
          thanks.classList.add("thanks_error");
          alertSound = soundError;
        }
        // Если не удалось связаться с php файлом
      } else {
        alert("Ошибка сервера. Номер: " + req.status);
      }

      // Вывод окна оповещения на страницу
      thanks.classList.add("active");
      // Звуковое оповещение
      soundPlay(alertSound);
      function soundPlay(sound) {
        sound.play();
      }

      // Затрем поля формы
      form.reset();
      selectedFile.innerHTML = "";

      // Автоматическое удаление окна оповещения
      setTimeout(function () {
        removeThanks();
      }, 5000);

      // Удаление окна оповещения
      function removeThanks() {
        thanks.classList.remove("active");
        thanks.style.animation = "slideUpOut .5s ease forwards";
        setTimeout(function () {
          thanks.remove();
          thanksBackdrop.remove();
        }, 500);
      }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () {
      alert("Ошибка отправки запроса");
    };
    req.send(new FormData(event.target));
  }
});

// Функции установки, удаления лоадера
function setupLoader(form) {
  var loader = document.createElement("div");
  loader.className = "submit-loader submit-loader_fixed";
  wrapper.appendChild(loader);
}
function removeLoader(form) {
  var loader = wrapper.querySelector(".submit-loader");
  loader.remove();
}