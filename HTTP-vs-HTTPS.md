HTTP vs HTTPS

- http is not secure but HTTPS is.
	- hyper-text (HTML) exchanged using http goes as plain text i.e. anyone between the browser and server can read it relatively easy if one intercepts this exchange of data.
- cryptographic protocols such as SSL and/or TLS turn http into https i.e. https = http + cryptographic protocols.
- to achieve this security in https, Public Key Infrastructure (PKI) is used because public keys can be used by several Web Browsers while private key can be used by the Web Server of that particular website. 
- The distribution of these public keys is done via Certificates which are maintained by the Browser. 
- another syntactic difference between http and htpps is that http uses default port 80 while https uses default port 443.
- this security in https is achieved at the cost of processing time because Web Server and Web Browser needs to exchange encryption keys using Certificates before actual data can be transferred. Basically, setting up of a secure session is done before the actual hypertext exchange between server and browser.

Differences between HTTP and HTTPS

In HTTP, URL begins with “http://” whereas URL starts with “https://”
HTTP uses port number 80 for communication and HTTPS uses 443
HTTP is considered to be unsecure and HTTPS is secure
HTTP Works at Application Layer and HTTPS works at Transport Layer
In HTTP, Encryption is absent and Encryption is present in HTTPS as discussed above
HTTP does not require any certificates and HTTPS needs SSL Certificates