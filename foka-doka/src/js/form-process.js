// F O R M S   P R O C E S S I N G

const sounds = {
  success: "php/audio/success.mp3",
  error: "php/audio/error-1.mp3",
};
let soundSuccess = new Sound(sounds.success);
let soundError = new Sound(sounds.error);
let alertSound = soundSuccess;

function Sound(src) {
  let audio = document.createElement("audio");
  audio.src = src;
  this.play = function () {
    audio.play();
  };
}

// Массив всех форм
const forms = Array.from(document.forms);
forms.forEach((form) => {
  let inputTypeFile = form.querySelector('input[type="file"]');
  let selectedFile = inputTypeFile.nextElementSibling;

  inputTypeFile.addEventListener("change", function () {
    if (this.files.length == 1) {
      selectedFile.innerHTML = `<div class="form__file_selected-label">Выбран файл: </div><div class="form__file_selected-value">${this.files[0].name}</div>`;
    }
    if (this.files.length > 1) {
      selectedFile.innerHTML = `<div class="form__file_selected-label">Выбрано файлов: </div><div class="form__file_selected-value">${this.files.length}</div>`;
    }
  });

  form.addEventListener("submit", function (event) {
    send(event, "../php/send-order.php");
  });

  function send(event, php) {
    // Установка лоадера
    setupLoader(form);

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var req = new XMLHttpRequest();
    req.open("POST", php, true);

    req.onload = function () {
      // Определение переменных для оповещения
      let thanks = document.createElement("div");
      let thanksContent = document.createElement("div");
      let thanksClose = document.createElement("div");
      let thanksBackdrop = document.createElement("div");
      thanksBackdrop.className = "thanks__backdrop";
      let messageSuccessful = `<div class="thanks__title"><span class="text_accent-prim">Спасибо,</span> ваш заказ отправлен!</div><div class="thanks__subtitle">В ближайшее время с вами свяжется наш специалист</div>`;
      let limitExceeded = `<div class="thanks__title"><span class="text_accent-prim">Ошибка.</span></div><div class="thanks__subtitle">Превышен максимальный размер прикрепляемых файлов (10мб).</div>`;
      let messageError = `<div class="thanks__title"><span class="text_accent-prim">Ошибка.</span></div><div class="thanks__subtitle">Сообщение не отправлено.</div>`;

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
        let json = JSON.parse(this.response);

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
      selectedFile.innerHTML = ``;

      // Автоматическое удаление окна оповещения
      setTimeout(function () {
        removeThanks();
      }, 5000);

      // Удаление окна оповещения
      function removeThanks() {
        thanks.classList.remove("active");
        thanks.style.animation = "slideUpOut .5s ease forwards";
        setTimeout(() => {
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
  let loader = document.createElement("div");
  loader.className = "submit-loader submit-loader_fixed";
  wrapper.appendChild(loader);
}

function removeLoader(form) {
  let loader = wrapper.querySelector(".submit-loader");
  loader.remove();
}
