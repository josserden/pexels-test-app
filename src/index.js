import 'material-icons/iconfont/material-icons.css';
import './sass/main.scss';
import card from './template/card.hbs';

const API_KEY = '563492ad6f917000010000017177ac82ad294f609aa250f88e62125c';
import { createClient } from 'pexels';
const client = createClient(API_KEY);

const formSearch = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-button');

const fetchImg = searchQuery => {
  const query = searchQuery;

  client.photos.search({ query, per_page: 20, orientation: 'landscape' }).then(photos => {
    console.log(photos);

    loadMoreBtn.addEventListener('click', () => {
      console.log(photos.next_page);
    });

    gallery.insertAdjacentHTML('beforeend', card(photos.photos));
  });
};

const searchImg = event => {
  event.preventDefault();

  const userRequest = event.currentTarget.elements.query.value.trim();

  fetchImg(userRequest);

  formSearch.reset();
};

formSearch.addEventListener('submit', searchImg);
