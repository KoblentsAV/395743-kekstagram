'use strict';

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
var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');

var showPicture = function (picture) {
  galleryOverlay.classList.remove('hidden');

  galleryOverlayImage.src = picture.url;

  likesCount.innerHTML = picture.likes;

  commentsCount.innerHTML = picture.commentsLength;
};


var galleryOverlayClose = document.querySelector('span.gallery-overlay-close');
var onOverlayClose = function () {
  galleryOverlay.classList.add('hidden');
};
galleryOverlayClose.addEventListener('click', onOverlayClose);

galleryOverlayClose.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    galleryOverlay.classList.add('hidden');
  }
});

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    galleryOverlay.classList.add('hidden');
  }
});

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

    showPicture(picture);
  });
}
