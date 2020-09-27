# What is a certificate used for

- A certificate serves two essential purposes:
  1. distributing the public key and
  2. verifying the identity of the server so visitors know they aren’t sending their information to the wrong person.
- It can only properly verify the identity of the server when it is signed by a trusted third party because any attacker can create a self-signed certificate and launch a man-in-the-middle attack.
- If a user just accepts a self-signed certificate, an attacker could eavesdrop on all the traffic or try to set up an imitation server to phish additional information out of the user.

## Self-signed certificate

- A self-signed certificate is a certificate that is signed by the person creating it rather than a trusted certificate authority.
- Self-signed certificates can enable the same level of encryption as a \$1500 certificate signed by a trusted authority, but there are two major drawbacks:
  1. a visitor's connection could be hijacked allowing an attacker view all the data sent (thus defeating the purpose of encrypting the connection)
  2. the certificate cannot be revoked like a trusted certificate can.

**You don't want to use a self-signed certificate on a server when it requires anonymous visitors to connect to your site**

## SSL certificate

- In order for your web browser to talk to an “https” website, that website needs to have what is called a trusted SSL certificate.
- If you receive an SSL certificate that is not trusted then your web browser will warn you and suggest that you leave the website.
- By default, your browser will trust certificates provided by large, well-established companies like VeriSign. These large companies issue SSL certificates to other companies that have proven that they are real businesses by verifying their business phone number and address.
- Getting a trusted SSL certificate can be expensive. It will definitely cost you.
  - SSL certificates are typically signed for a particular domain (ie: www.mybank.com). This means that the certificate cannot be used for a different domain and that one would need to purchase a domain to go along with the SSL certificate.
  - you might also need to purchase a static IP address address from your Internet Service Provider (ISP) to ensure your newly purchased personal website consistently redirects to your home computer
- you can generate your own SSL certificate for free but when you visit your website your web browser will display warning signs that it is untrustworthy.

# Self-signed certificate solution

- You go to your web application's https website and download the JavaScript Transport Layer Security (TLS) and the Flash file to access your server at home.
- Your browser also downloads the SSL certificate for your web application at home so it knows who to trust.
- Using that (temporary?) SSL certificate you can communicate directly with your application at home from your web application

- If you don't want to store the self-signed certificates created, an alternative is to create your own Certificate Authority that can sign the certificates using an appropriate common or subject alternative name. Then you can have the JavaScript code check for the appropriate name when connecting to a particular home application.

# Terminology

- We will be referring to SSL server certificates throughout.
- Server certificates are presented by a web server whenever a new SSL connection is requested. They contain the name of the host the certificate is issued to (which should match the server you’re attempting to connect to) and are signed by a Certificate Authority to establish trust.

## Certificate Authority (CA)

- Certificate authorities verify details about a domain owner’s request for SSL certificates, then – if everything checks out – issue and sign server certificates.
- Browsers and operating systems maintain a list of trusted certificate authorities.
- If a server certificate is signed by one of these trusted CAs, it will also be trusted.

## Domain Validation (DV)

- A domain validated certificate will be issued to somebody who has proven they control the domain name requested for the certificate.
  - This proof often takes the form of serving a unique token from your web server or DNS records, which the CA will check for before issuing the certificate.
- This is different from Wildcard Certificate; It only validates a specific fully qualified domain name

## Wildcard Certificate

- Instead of being issued for a specific fully qualified domain name (app.example.com, for instance), wildcard certs are valid for a whole range of subdomain names.
  - So a cert issued to `*.example.com` would cover any subdomain of example.com such as app.example.com and database.example.com.
  - The asterisk character is the wildcard, and can be substituted with any valid hostname.

## Organization Validation (OV)

- An organization validated certificate means that the certificate authority also verified the company name and address in public databases.
- This information is put into the certificate, and is typically displayed only when the user clicks the green padlock icon to investigate further.

## Extended Validation(EV)

- Extended validation is more thorough than domain or organization validation. EV certificates are issued after checking not only domain ownership, but also verifying the existence and location of the legal entity requesting the certificate, and that said entity controls the domain being verified.
- Unlike DV and OV certificates, EV cannot be issued as a wildcard certificate.
- EV certificates also get special treatment in web browsers. Whereas browsers typically denote a DV certificate with a green padlock icon, EV certificates also show a larger green bar containing the name of the organization it was issued to.

## Certificate Revocation List (CRL)

- SSL certificates can include information on how to access a certificate revocation list.
- Clients will download and check this list to make sure the certificate has not been revoked.

**CRLs have largely been replaced by OCSP responders.**

## Online Certificate Status Protocol (OCSP)

- The OCSP protocol is a replacement for CRLs, with the benefits of being more real-time and requiring less bandwidth. The general operation is similar: clients are to query the OCSP responder to check if a certificate has been revoked.

# Commercial Certificate Authorities

Commercial certificate authorities allow you to purchase DV, OV, and EV certificates. Some offer free Domain Validated certificates with certain restrictions (no wildcards, for instance).

- Process: Manual process for initial setup and renewal
- Cost: roughly $10–$1000
- Validation: DV, OV, and EV
- Trust: Trusted by default in most browsers and operating systems
- Wildcard Certificates: Yes
- IP-only Certificates: Some will issue certificates for public IP addresses
- Expiration Period: 1–3 years

- Most commercial certificate authorities are trusted by default in most browsers. The process to renew is typically manual, so you must note your certificates’ expiration dates and remind yourself to renew on time.
- Commercial CAs have traditionally been the only real option for obtaining certificates trusted by most major browsers.
  - This has changed with new automated certificate authorities like Let’s Encrypt.
  - They are also a good option if you need a certificate for a device that can’t run the automated Let’s Encrypt client (due to software incompatibility, or perhaps being a low-power embedded device).
  - commercial CAs are the only way to get an EV certificate, and the only way to get a wildcard certificate that is automatically trusted by most browsers.

# Let's Encrypt

Let’s Encrypt provides an automated mechanism to request and renew free domain validated certificates.

They’ve created a standard protocol – ACME – for interacting with the service to retrieve and renew certificates automatically. The official ACME client is called Certbot, though many alternative clients exist.

- Process: Initial setup and renewal is automated. Only Apache and Nginx setup is automated with the official client, but certificates can be downloaded and used independent of any particular server software.
- Cost: Free
- Validation: DV only
- Default: Trusted by default in most browsers and operating systems
- Wildcard Certificates: No (Planned for January 2018)
- IP-only Certificates: No
- Expiration Period: 90 days

- Let’s Encrypt certificates are short-lived to encourage automated renewal and to reduce the time any compromised certificates could be abused by an attacker.
- Let’s Encrypt will not provide certificates for a bare IP address.

- If you need an EV certificate, or a wildcard certificate, Let’s Encrypt is not an option.

> Note that Let’s Encrypt can create a certificate with up to 100 hostnames on it, so it’s possible you don’t actually need a wildcard for your use case, you may just need a certificate that covers all of your existing subdomains.

- Still, due to rate limits on the Let’s Encrypt API, if you have lots of subdomains, or dynamic subdomains that can be created on the fly, Let’s Encrypt may not be suitable.

# Self-Signed Certificates

Self-Signed certificates are useful when:

1. In an Intranet

When clients only have to go through a local Intranet to get to the server, there is virtually no chance of a man-in-the-middle attack.

2. Development server

There is no need to spend extra cash buying a trusted certificate when you are just developing or testing an application.

3. Personal sites with few visitors

If you have a small personal site that transfers non-critical information, there is very little incentive for someone to attack the connections.

- Process: Manual certificate creation, no renewal mechanism
- Cost: Free
- Validation: DV and OV
- Trust: None by default. Each certificate must be manually marked as trusted, as there is no common CA involved
- Wildcard Certificates: Yes
- IP-only Certificates: Yes, any IP
- Expiration Period: Any

- Self-signed certificates can be made with the openssl command that ships with the OpenSSL library.
- Because a self-signed certificate is not signed by any trusted CA, you’ll need to manually mark the certificate as trusted, a process which is different in each browser and operating system. Thereafter, the certificate will act like any normal CA-signed certificate.
  - visitors will see a warning in their browsers when connecting to a server that uses a self-signed certificate until it is permanently stored in their certificate store.

# Private Certificate Authorities

- If you are going to use a self-signed certificate for one of the situations where they are appropriate, it is much better to create your own private CA certificate.

- Process: Manual certificate creation and renewal, plus manual setup of the CA itself
- Cost: Free
- Validation: DV and OV
- Trust: None by default. You must manually distribute your private CA certificate to clients to establish trust
- Wildcard Certificates: Yes
- IP-only Certificates: Yes, any IP
- Expiration Period: Any

- As with self-signed certificates you can create a private CA using the command line tools that come with the OpenSSL library.
- Unlike self-signed certificates, where each certificate must be marked as trusted manually, you only have to install the private CA once. All certificates issued from that CA will then inherit that trust.
- If proper revocation is important for your use, you’ll also need to maintain an HTTP server for the certificate revocation list, or an OCSP responder.

# More resources

- [OpenSSL documentation](https://www.openssl.org/docs/)
- [CA/Browser Forum](https://cabforum.org/)
- [Let's Encrypt CA](https://letsencrypt.org/)
