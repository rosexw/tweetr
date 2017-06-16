/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  //this converts the date to how many hours ago the tweet was made. It rounds down the number of hours.
  const created = new Date(tweetData.created_at);
  const today = Date.now();
  const timeDiff = Math.abs(today - created.getTime());
  const diffHours = Math.ceil(timeDiff / (1000 * 3600));

  return $(`<article class = "tweets">
    <header>
      <div class="header-left">
        <img class="avatar" src="${tweetData.user.avatars.small}" alt="Twitter picture" height="42" width="42">
        <span class="author">${tweetData.user.name}</span>
      </div>
      <span class="username">${tweetData.user.handle}</span>
    </header>
    <section>
      <p> ${tweetData.content.text} </p>
    </section>
    <footer>
      <span class="date">${diffHours} hours ago  </span>
      <span class="icons">
        <i class="fa fa-flag fa-lg" aria-hidden="true"></i>
        <i class="fa fa-retweet fa-lg" aria-hidden="true"></i>
        <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
      </span>
    </footer>
  </article>`);
};

function renderTweets(tweets) {
  $('#tweets-container').children().remove();
  tweets.forEach (function (tweet) {
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  });
}

function loadTweets () {
  $('#mySpinner').addClass('spinner');
  $.get({
    url: '/tweets',
    success: (data) => {
      $('#mySpinner').removeClass('spinner');
      renderTweets(data.reverse());
    }
  })
}

$(document).ready(() => {
  $('.new-tweet').hide();
  $('#nav-bar .compose').click(function() {
    $('.new-tweet').slideToggle();
    $('.tweettext').focus();
  })

  $('.new-tweet form').on('submit', function (event) {
    //"this" is form info
    let array = $(this).serializeArray();

    function objectifyForm(formArray) {
      var obj = {};

      for (var i = 0; i < formArray.length; i++){
        obj[formArray[i]['name']] = formArray[i]['value'];
      }
      return obj;
    }
    let data = objectifyForm(array);

    event.preventDefault();

    if (!$(".new-tweet textarea").val().length) {
      alert("Please enter more characters");
    } else if ($(".new-tweet textarea").val().length > 140) {
      alert("Please reduce text to 140 characters or less.");
    } else {
      $.post({
        url: '/tweets',
        data: data,
      })
      .then(loadTweets);

      $(".new-tweet textarea").val("");
      $(".counter").html(140);

    }

  });
  loadTweets();
});
