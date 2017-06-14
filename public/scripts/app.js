/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = (tweetData) => {
  const date = new Date(tweetData.created_at);
  return $(`<article class = "tweets">
    <header>
      <img class="avatar" src="${tweetData.user.avatars.small}" alt="Twitter picture" height="42" width="42">
      <span class="author">${tweetData.user.name}</span>
      <span class="username">: ${tweetData.user.handle}</span>
    </header>
    <section>
      <p> ${tweetData.content.text} </p>
    </section>
    <footer>
      <span class="date">${date.toLocaleString()}</span>
      <span class="icons">
        <i class="fa fa-flag fa-lg" aria-hidden="true"></i>
        <i class="fa fa-retweet fa-lg" aria-hidden="true"></i>
        <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
      </span>
    </footer>
  </article>`);
};

$(document).ready(() => {
  var $tweet = createTweetElement(tweetData);
  console.log('$tweet', $('#tweets-container'))
  $('#tweets-container').append($tweet);
});
