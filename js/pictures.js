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

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var picturesContainer = document.querySelector('.pictures');
picturesContainer.appendChild(fragment);


var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
galleryOverlayImage.src = pictures[0].url;

var likesCount = document.querySelector('.likes-count');
likesCount.innerHTML = pictures[0].likes;

var commentsCount = document.querySelector('.comments-count');
commentsCount.innerHTML = pictures[0].comments.length;
