'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// функция расчета случайного числа
var randomLikesInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// функция получения случайных комментариев
var getComments = function () {
  return [
    comments[randomLikesInteger(0, comments.length)],
    comments[randomLikesInteger(0, comments.length)]
  ];
};

var pictures = [];

for (var i = 0; i < 25; i++) {
  pictures.push({
    url: 'photos/' + parseInt(i + 1, 10) + '.jpg',
    likes: randomLikesInteger(15, 200),
    comments: getComments(),
  });
}

var template = document.querySelector('#picture-template');
var fragment = document.createDocumentFragment();

for (i = 0; i < pictures.length; i++) {
  var element = template.content.cloneNode(true);
  var img = element.querySelector('img');
  img.src = pictures[i].url;

  fragment.appendChild(element);
}
