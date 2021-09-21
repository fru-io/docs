---
title: Services
description: Additional services for the Fru hosting environment 
---
# Services

## Email
Fru.io does not provide SMTP (Simple Mail Transfer Protocol) server or Sendmail functionality. This means that your applications cannot rely on PHP's built-in mail functions to ensure mail delivery.

We recommend leveraging a 3rd party transactional email service such as SendGrid, Mandrill, or Mailgun. Many of these 3rd parties provide module or plugin support for your CMSs or provide SMTP configuration.

- [TYPO3 SMTP configuration documentation](https://docs.typo3.org/m/typo3/reference-coreapi/master/en-us/ApiOverview/Mail/Index.html#transport)
- [Drupal SMTP Authentication Support](https://www.drupal.org/project/smtp)
- [WordPress WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/)
