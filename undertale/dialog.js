const fullscreenButton = document.getElementById('fullscreen-button');

fullscreenButton.addEventListener('click', () => {
  enterFullscreen();
});
// Функция для перехода в полноэкранный режим
function enterFullscreen() {
  const elem = document.documentElement; // Получаем элемент <html>

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Для Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Для Chrome, Safari и Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // Для IE/Edge
    elem.msRequestFullscreen();
  }
}

// Предлагаем пользователю перейти в полноэкранный режим при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  enterFullscreen();
});

// Получаем элементы
const dialogBox = document.getElementById('dialog-box');
const textContainer = document.getElementById('text-container');
const typingSound = document.getElementById('typing-sound');
const openMainButton = document.querySelector('.open-main');
const crossImage = document.getElementById('cross-image');
const backgroundMusic = document.getElementById('background-music');


// Массив с текстами для диалога
const dialogTexts = [
  "* Ты всматриваешься в луну, что отражает свет давно ушедшего за горизонт солнца",
  "* В свете далеких звезд ты видишь древних предков, что наблюдают за тобой",
  "* Ты опускаешь глаза на лужу, появившуюся из-за моросящего дождя, и видишь своё отражение",
  "* Несмотря на все, это всё ещё ты",
  "* Свет далеких звезд и благосклонное молчание матушки Луны наполняют тебя.....",
  "* РЕШИМОСТЬЮ"
];

let currentTextIndex = 0; // Индекс текущего текста
let isTyping = false; // Флаг, показывающий, выполняется ли печатание
let isLastTextCompleted = false; // Флаг, показывающий, завершен ли последний текст

// Функция для постепенного вывода текста
function typeText(text, element, delay = 50) {
  let index = 0;
  element.innerHTML = ""; // Очищаем контейнер

  const interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text[index];
      index++;

      // Воспроизводим звук печатания
      if (!typingSound.paused) {
        typingSound.currentTime = 0; // Перезапускаем звук
      }
      typingSound.play();
    } else {
      clearInterval(interval); // Останавливаем интервал
      typingSound.pause(); // Останавливаем звук
      isTyping = false; // Отключаем флаг печатания

      // Если это последний текст, устанавливаем флаг завершения
      if (currentTextIndex === dialogTexts.length) {
        isLastTextCompleted = true;
      }
    }
  }, delay);
}

// Функция для показа следующего текста
function showNextText() {
  if (currentTextIndex < dialogTexts.length) {
    isTyping = true; // Устанавливаем флаг печатания
    typeText(dialogTexts[currentTextIndex], textContainer);
    currentTextIndex++;
  }
}

// Устанавливаем громкость звука печатания
typingSound.volume = 0.2; // Громкость 30%
// Устанавливаем громкость фоновой музыки
backgroundMusic.volume = 0.2; // Громкость 30% (можно изменить на любое значение от 0 до 1)

// Обработчик нажатия на кнопку "Go deeper"
openMainButton.addEventListener('click', () => {
  console.log('Кнопка нажата');

  // Проверяем состояние музыки
  if (backgroundMusic.muted) {
    console.log('Музыка была заглушена. Включаю...');
    backgroundMusic.muted = false;
    backgroundMusic.play();
  } else {
    console.log('Музыка уже включена.');
  }

  // Запускаем диалог
  openMainButton.classList.add('hidden-button');
  dialogBox.classList.remove('hidden');
  dialogBox.style.display = 'block';
  showNextText();
});

// Обработчик клика по экрану для продолжения диалога
document.addEventListener('click', () => {
  if (!dialogBox.classList.contains('hidden') && !isTyping) {
    // Если текст не закончен, показываем следующий текст
    if (!isLastTextCompleted) {
      showNextText();
    } else {
      // Если последний текст завершен, показываем изображение креста
      dialogBox.classList.add('hidden'); // Скрываем диалоговое окно
      dialogBox.style.display = 'none';
      crossImage.classList.remove('hidden'); // Показываем изображение креста
    }
  }
});