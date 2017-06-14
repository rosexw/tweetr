/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 let data = [
   {
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
   },
   {
     "user": {
       "name": "Descartes",
       "avatars": {
         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
       },
       "handle": "@rd" },
     "content": {
       "text": "Je pense , donc je suis"
     },
     "created_at": 1461113959088
   },
   {
     "user": {
       "name": "Johann von Goethe",
       "avatars": {
         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
       },
       "handle": "@johann49"
     },
     "content": {
       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
     },
     "created_at": 1461113796368
   }
 ];

//when have time: work on converting created_at from date/time to days/hours/minutes ago/now
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

function renderTweets(tweets) {
  tweets.forEach (function (tweet) {
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  });
}

$(document).ready(() => {
  renderTweets(data);
});
