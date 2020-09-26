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

## Self-signed certificates are useful when

1. In an Intranet

When clients only have to go through a local Intranet to get to the server, there is virtually no chance of a man-in-the-middle attack.

2. Development server

There is no need to spend extra cash buying a trusted certificate when you are just developing or testing an application.

3. Personal sites with few visitors

If you have a small personal site that transfers non-critical information, there is very little incentive for someone to attack the connections.

Keep in mind that visitors will see a warning in their browsers when connecting to a server that uses a self-signed certificate until it is permanently stored in their certificate store.

## Private Certificate Authorities (CAs)

- If you are going to use a self-signed certificate for one of the situations where they are appropriate, it is much better to create your own private CA certificate.

# Self-signed certificate solution

- You go to your web application's https website and download the JavaScript Transport Layer Security (TLS) and the Flash file to access your server at home.
- Your browser also downloads the SSL certificate for your web application at home so it knows who to trust.
- Using that (temporary?) SSL certificate you can communicate directly with your application at home from your web application

- If you don't want to store the self-signed certificates created, an alternative is to create your own Certificate Authority that can sign the certificates using an appropriate common or subject alternative name. Then you can have the JavaScript code check for the appropriate name when connecting to a particular home application.
