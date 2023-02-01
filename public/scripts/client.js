/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  // >>> CREATE INDIVIDUAL TWEET ELEMENT FROM DB
  const createTweetElement = function(tweetObj) {
    const $tweetElement = `
      <article class="article-tweet">
        <header>
          <span class="user-info">
            <img src="${tweetObj.user.avatars}"/>
            <p>${tweetObj.user.name}</p>
          </span>
          <span class="user-handle">${tweetObj.user.handle}</span>
        </header>
        <p class="tweet-content">${tweetObj.content.text}</p>
        <footer>
          <span>${tweetObj.created_at}</span>
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`;
    return $tweetElement;
  };

  // >>> LOOP THROUGH DATABASE, APPEND EACH ELEMENT TO TWEET CONTAINER
  const renderTweets = function(tweetArr) {
    for (const tweetObj of tweetArr) {
      let result = createTweetElement(tweetObj);
      $('.tweet-container').append(result);
    }
  };

  // >>> CALL RENDER FUNCTION ON LOAD
  renderTweets(tweetData);

});



