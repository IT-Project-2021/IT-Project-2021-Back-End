const mailgunAPI = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const nodeEnv = process.env.NODE_ENV;
const Mailgun = require('mailgun-js');
const Q = require('q');

// Send to the user an email with the given template and subject
const mailSender = (userEmail, subject, template, mailgunVariables) => {
  const deferred = Q.defer();
  if (nodeEnv === 'production') {
    const mailgun = new Mailgun({
      apiKey: mailgunAPI,
      domain: mailgunDomain
    });

    const mailData = {
      from: 'mailgun@mg.danielfink.live',
      to: userEmail,
      subject,
      template,
      'h:X-Mailgun-Variables': JSON.stringify(mailgunVariables)
      // 'o:deliverytime': deliveryTime
      // var milliseconds = date.getTime();
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
  }

  return deferred.promise;
};

module.exports = { mailSender };
