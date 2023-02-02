/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
        <p class="tweet-content">${escape(tweetObj.content.text)}</p>
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

  $newTweetForm.submit(function(event) {
    event.preventDefault();
    const $formInput = $(this).serialize();



    // >>> FORM VALIDATION & POST REQUEST

    const $tweetLength = $('#tweet-text').val().length;

    $('.new-tweet-error').slideUp('fast');

    if ($tweetLength <= 0) {
      const $error = $('<i class="fa-solid fa-triangle-exclamation"></i><h4> Tweet field empty! Please type something out before you submit.</h4><i class="fa-solid fa-triangle-exclamation"></i>');

      $('.new-tweet-error').html($error).slideDown('fast');

    } else if ($tweetLength > 140) {
      const $error = $('<i class="fa-solid fa-triangle-exclamation"></i><h4> You are over the character limit! Please use less words.</h4><i class="fa-solid fa-triangle-exclamation"></i>');

      $('.new-tweet-error').html($error).slideDown('fast');

    } else {
      $.post('/tweets', $formInput, () => {
        $('#tweet-text').val('');
        $(".counter").val("140");
        $('.new-tweet-error').slideUp('fast');
        $('.new-tweet-error').html('');

        loadTweets();

      }).fail(function() {
        const $error = $('<i class="fa-solid fa-triangle-exclamation"></i><h4>Something went wrong in the server.</h4><i class="fa-solid fa-triangle-exclamation"></i>');
        $('.new-tweet-error').html($error);
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

