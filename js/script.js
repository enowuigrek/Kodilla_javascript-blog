'use strict';

const articleSelector = '.post';
const titleSelector = '.post-title';
const titleListSelector = '.titles';
const titleList = document.querySelector (titleListSelector);
const articles = document.querySelectorAll (articleSelector);

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  const activeArticles = document.querySelectorAll('.post');
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  targetArticle.classList.add('active');
}

function generateTitleLinks(){
  titleList.innerHTML = '';
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(titleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    article.addEventListener('click', titleClickHandler);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
