'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleBeerStylesSelector ='.post-beerstyle';
const optBeerStylesListListSelector ='.list-beerstyle .list';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size-';

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

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  titleList.innerHTML = '';
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // article.addEventListener('click', titleClickHandler);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      html = html + linkHTML;
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags [tag]++;
      }
    }
    titleList.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams );

  let allTagsHTML = ' ';
  for(let tag in allTags){
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
  }

  tagList.innerHTML = allTagsHTML;
  console.log(tagList)
}

generateTags();


function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href)

  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags)
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for(let tagLink of tagLinks){
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags(){
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  for(let link of allLinksToTags){
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


function generateBeerStyles(){
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const titleList = article.querySelector(optArticleBeerStylesSelector);
    let html = '';
    const beerStyle = article.getAttribute('data-beerstyles');
    const linkHTML = '<a href="#tag-' + beerStyle + '"><span>' + beerStyle + '</span></a>';
    html = html + linkHTML;
    titleList.innerHTML = html;

  }
}

generateBeerStyles();


function beerStyleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const hrefBeerStyles = clickedElement.getAttribute('href');
  console.log(hrefBeerStyles)
  const tagBeerStyle = href.replace('#tag-', '');
  const activeBeerStyles = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeBeerStyle of activeBeerStyles){
    activeBeerStyle.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + hrefBeerStyles + '"]');
  for(let tagLink of tagLinks){
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags="' + tagBeerStyle+ '"]');
  console.log (tagBeerStyle)
}


function addClickListenersToBeerStyles(){
  const allLinksToBeerStyles = document.querySelectorAll('a[href^="#tag-"]');
  for(let link of allLinksToBeerStyles){
    console.log(link)
    link.addEventListener('click', beerStyleClickHandler);
  }
}
