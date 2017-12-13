'use strict';

var ESCAPE_KEYCODE = 27;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getComments = function () {
  return [
    comments[randomInteger(0, comments.length)],
    comments[randomInteger(0, comments.length)]
  ];
};

var pictures = [];

for (var i = 0; i < 25; i++) {
  pictures.push({
    url: 'photos/' + parseInt(i + 1, 10) + '.jpg',
    likes: randomInteger(15, 200),
    comments: getComments(),
  });
}

var template = document.querySelector('#picture-template');
var fragment = document.createDocumentFragment();

for (i = 0; i < pictures.length; i++) {
  var element = template.content.cloneNode(true);

  var img = element.querySelector('img');
  img.src = pictures[i].url;

  var likes = element.querySelector('.picture-likes');
  likes.innerHTML = pictures[i].likes;

  var randomComments = element.querySelector('.picture-comments');
  randomComments.innerHTML = pictures[i].comments.length;

  fragment.appendChild(element);
}

var picturesContainer = document.querySelector('.pictures');
picturesContainer.appendChild(fragment);


// События открытия/закрытия галереи


var galleryOverlay = document.querySelector('.gallery-overlay');
var closeModal = function () {
  galleryOverlay.classList.add('hidden');
  window.removeEventListener('keydown', modalKeydownHandler);
};
var openModal = function () {
  galleryOverlay.classList.remove('hidden');
};

var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');

var showPicture = function (picture) {
  openModal();

  galleryOverlayImage.src = picture.url;

  likesCount.innerHTML = picture.likes;

  commentsCount.innerHTML = picture.commentsLength;
};


var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

galleryOverlayClose.addEventListener('click', function () {
  closeModal();
});

var modalKeydownHandler = function (event) {
  if (event.keyCode === ESCAPE_KEYCODE) {
    closeModal();
  }
};


var picturesElements = document.querySelectorAll('.picture');

for (i = 0; i < picturesElements.length; i++) {
  var pictureElement = picturesElements[i];

  pictureElement.addEventListener('click', function (event) {
    event.preventDefault();

    pictureElement = event.currentTarget;

    var picture = {
      url: pictureElement.querySelector('img').src,
      likes: pictureElement.querySelector('.picture-likes').textContent,
      commentsLength: pictureElement.querySelector('.picture-comments').textContent
    };

    window.addEventListener('keydown', modalKeydownHandler);

    showPicture(picture);
  });
}


// Поведение формы upload-form


var uploadInput = document.querySelector('.upload-input');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var uploadFormDescription = document.querySelector('.upload-form-description');

var closeUploadModal = function () {
  uploadOverlay.classList.add('hidden');
};

var descriptionFocusHandler = function () {
  window.removeEventListener('keydown', uploadKeydownHandler);
};

var descriptionBlurHandler = function () {
  window.addEventListener('keydown', uploadKeydownHandler);
};

var uploadKeydownHandler = function (event) {
  if (event.keyCode === ESCAPE_KEYCODE) {
    closeUploadModal();
  }
};

var uploadClickHandler = function () {
  closeUploadModal();
};

var uploadChangeHandler = function () {
  uploadOverlay.classList.remove('hidden');
};

uploadInput.addEventListener('change', uploadChangeHandler);
uploadFormCancel.addEventListener('click', uploadClickHandler);
window.addEventListener('keydown', uploadKeydownHandler);

uploadFormDescription.addEventListener('focus', descriptionFocusHandler);
uploadFormDescription.addEventListener('blur', descriptionBlurHandler);


// Масштабирование пользовательской фотографии

var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeValue = document.querySelector('.upload-resize-controls-value');
var effectImagePreview = document.querySelector('.effect-image-preview');

var maxPercent = '100%';
var minPercent = '25%';
var percentValues = function () {
  if (resizeValue.value === minPercent) {
    effectImagePreview.style.cssText = 'transform: scale(0.25)';
  }
  if (resizeValue.value === '50%') {
    effectImagePreview.style.cssText = 'transform: scale(0.5)';
  }
  if (resizeValue.value === '75%') {
    effectImagePreview.style.cssText = 'transform: scale(0.75)';
  }
  if (resizeValue.value === maxPercent) {
    effectImagePreview.style.cssText = 'transform: scale(1)';
  }
};


var ButtonIncClickHandler = function () {
  resizeButtonDec.addEventListener('click', ButtonDecClickHandler);
  resizeValue.value = +resizeValue.value.slice(0, -1) + 25 + '%';
  if (resizeValue.value === maxPercent) {
    resizeButtonInc.removeEventListener('click', ButtonIncClickHandler);
  }
  percentValues();
};

resizeButtonInc.addEventListener('click', ButtonIncClickHandler);


var ButtonDecClickHandler = function () {
  resizeButtonInc.addEventListener('click', ButtonIncClickHandler);
  resizeValue.value = resizeValue.value.slice(0, -1) - 25 + '%';
  if (resizeValue.value === minPercent) {
    resizeButtonDec.removeEventListener('click', ButtonDecClickHandler);
  }
  percentValues();
};

resizeButtonDec.addEventListener('click', ButtonDecClickHandler);


// фильтры
var uploadEffect = document.querySelector('.upload-effect-controls');
var imagePreview = document.querySelector('.effect-image-preview');


uploadEffect.addEventListener('click', function (evt) {
  var target = evt.target.value;

  if (evt.target.tagName === 'INPUT') {
    var imageClass = 'effect-' + target;
    imagePreview.classList.remove(imagePreview.classList.item(1));
    imagePreview.classList.add(imageClass);
  }
});
