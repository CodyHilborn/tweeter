/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

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
          <span>${timeago.format(tweetObj.created_at)}</span>
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
      $('#tweet-container').prepend(result);
    }
  };


  // >>> EVENT LISTENER FOR NEW TWEET FORM SUBMISSION
  const $newTweetForm = $('.new-tweet-form');

  $($newTweetForm).submit(function(event) {
    event.preventDefault();
    const $formInput = $(this).serialize();

    // >>> FORM VALIDATION & POST REQUEST

    const $tweetLength = $('#tweet-text').val().length;

    if ($tweetLength <= 0) {
      alert('Tweet field empty! Please type something out before you submit.');
    } else if ($tweetLength > 140) {
      alert("You're over the character limit! Please use less words.");
    } else {
      $.post('/tweets', $formInput, () => {
        loadTweets();
      });
    }

  });


  // >>> GET REQUEST TO LOAD TWEETS FROM DATABASE
  const loadTweets = function() {
    $.get('http://localhost:8080/tweets', (data) => {
      $('#tweet-container').empty();
      renderTweets(data);
    });
  };

  loadTweets();

});

