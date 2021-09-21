---
title: 'HTTPS on Fru-Live'
description: null
freshdesk:
    title: 'HTTPS on Fru-Live'
    id: 36000069971
    type: 1
    category_id: 36000020154
    folder_id: 36000030822
    status: 2
    tags: []
    agent_id: 36008255312
---

Fru.io provides free TLS certificates for every site launched on the platform through [Let's Encrypt](<https://letsencrypt.org>). Unless you specifically request that a given site *not* be served over HTTPS, we will enable HTTPS and provision a certificate automatically. Please note: at this time we do *not* serve a redirect from HTTP to HTTPS, so your application code will need to handle that.

In order to provision a certificate for a particular hostname, DNS for that hostname must be pointed at the Fru.io platform.

## Limitations

The main limitations to be aware of are detailed on the [Let's Encrypt Rate Limits](<https://letsencrypt.org/docs/rate-limits/>) page. These rate limits affect how quickly large numbers of sites can be moved onto the platform.

The amount of time that it takes from the point where DNS has been switched to the point where a certificate has been issued can vary from 30 seconds up to 30 minutes, depending on how many others sites are requesting certificates at that exact moment in time. This is a fully automated process that will begin as soon as DNS has propagated. In the interim, the site will be served with a dummy certificate that will cause an error to be shown in most browsers if a user attempts to access the site via HTTPS.

## Wildcard certificates

At present, we do not have support for wildcard certificates.

---

## Non-Let's Encrypt certificates

For clients with a dedicated Technical Account Manager, we currently offer limited support for bringing your own certificate to the Fru.io platform. If this is a requirement for your deployment, please reach out to your TAM for more details.

As a general guideline, we require a minimum term of three years. Additionally, we do not monitor or renew certificates that you have provided to us, so we ask that you notify us 90 days before the certificate expires and provide us with an updated certificate as soon as you're able to get one from your certificate issuer.

