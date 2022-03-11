'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleBeerStylesSelector ='.post-beerstyle';
const optBeerStylesListSelector ='.beerstyles';
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

  let allTagsHTML = ' ';
  for(let tag in allTags){
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '" ><span>' + tag + ' (' +allTags[tag]+ ')' + '</span></a></li>';
    allTagsHTML += tagLinkHTML;
  }
  console.log(tagList)
  tagList.innerHTML = allTagsHTML;
}

generateTags();


function tagClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  console.log(tag)
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

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
  let allBeerStyles ={};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const titleList = article.querySelector(optArticleBeerStylesSelector);

    let html = '';

    const beerStyle = article.getAttribute('data-beerstyles');
    const linkHTML = '<a href="#beerStyle-' + beerStyle + '"><span>' + beerStyle + '</span></a>';
    html = html + linkHTML;

    if(!allBeerStyles.hasOwnProperty(beerStyle)){
      allBeerStyles[beerStyle] = 1;
    } else {
      allBeerStyles[beerStyle] ++;
    }
    titleList.innerHTML = html;
  }

  const beerStylesList = document.querySelector(optBeerStylesListSelector);
  const beerStylesParams = calculateTagsParams(allBeerStyles);

  let allBeerStylesHTML = ' ';
  for(let beerStyle in allBeerStyles){
    const beerStyleLinkHTML = '<li><a class="' + calculateTagClass(allBeerStyles[beerStyle], beerStylesParams) + '" href="#beerStyle-' + beerStyle + '" ><span>' + beerStyle  + '</span></a></li>';
    allBeerStylesHTML += beerStyleLinkHTML;
  }
  console.log(beerStylesList)
  beerStylesList.innerHTML = allBeerStylesHTML;
}

generateBeerStyles();


function beerStyleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const bs = href.replace('#beerStyle-', '');
  console.log (bs)
  const activeBeerStyles = document.querySelectorAll('a.active[href^="#beerStyle-"]');

  for(let activeBeerStyle of activeBeerStyles){
    activeBeerStyle.classList.remove('active');
  }

  const bsLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let bsLink of bsLinks){
    bsLink.classList.add('active');
  }
  generateTitleLinks('[data-beerstyles="' + bs + '"]');
}


function addClickListenersToBeerStyles(){
  const allLinksToBeerStyles = document.querySelectorAll('a[href^="#beerStyle-"]');

  for(let link of allLinksToBeerStyles){
    link.addEventListener('click', beerStyleClickHandler);
  }
}

addClickListenersToBeerStyles()
