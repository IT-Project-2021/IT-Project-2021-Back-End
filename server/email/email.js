const mailgunAPI = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const Mailgun = require('mailgun-js');
const Q = require('q');

// Send to the user an email with the given template and subject
const mailSender = (userEmail, subject, html) => {
  const deferred = Q.defer();
  const mailgun = new Mailgun({
    apiKey: mailgunAPI,
    domain: mailgunDomain
  });

  const mailData = {
    from: 'mailgun@mg.danielfink.live',
    to: userEmail,
    subjectS: subject,
    html,
    // 'o:deliverytime': deliveryTime
  };

  // send your mailgun instance the mailData
  mailgun.messages().send(mailData, (err, body) => {
    if (err) {
      // eslint-disable-next-line no-console
      deferred.reject(console.log(`failed: ${err}`));
    } else {
      deferred.resolve(body);
    }
  });

  return deferred.promise;
};

module.exports = { mailSender };

// var milliseconds = date.getTime();

// curl -s --user 'api:***REMOVED***' \
//     https://api.mailgun.net/v3/mg.danielfink.live/messages \
//     -F from='Excited User <mailgun@mg.danielfink.live>' \
//     -F to=dfink100@gmail.com \
//     -F subject='Hello' \
//     -F text='Testing some Mailgun awesomeness!' \
//     -F o:testmode= true \
//     -F o:deliverytime='2021-10-31T11:40:09.000+00:00'
