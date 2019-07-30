Domain name system security extensions (DNSSEC) 

- Domain name system security extensions (DNSSEC) are a set of protocols that add a layer of security to the domain name system (DNS) lookup and exchange processes.
- is aimed at strengthening trust in the Internet by helping to protect users from redirection to fraudulent websites and unintended addresses. In such a way, malicious activities like cache poisoning, pharming, and man-in-the-middle attacks can be prevented. 
- DNSSEC authenticates the resolution of IP addresses with a cryptographic signature, to make sure that answers provided by the DNS server are valid and authentic. 

Basically, when DNSSEC is properly enabled for your domain name, the visitors can be ensured that they are connecting to the actual website corresponding to a particular domain name. 

How DNSSEC works:
1. a visitor enters the domain name in a browser, the resolver verifies the digital signature.
2. If the digital signatures in the data match those that are stored in the master DNS servers, then the data is allowed to access the client computer making the request.

DNSSEC uses a system of public keys and digital signatures to verify data. It simply adds new records to DNS alongside existing records. 
These new record types, such as RRSIG and DNSKEY, can be retrieved in the same way as common records such as A, CNAME and MX.

Because of that DNSSEC does not provide data confidentiality because it does not include encryption algorithms. It only carries the keys required to authenticate DNS data as genuine or genuinely not available.

Also, DNSSEC does not protect against DDoS Attacks.

Viewing the DS record:
The DS record stands for Delegation Signer, and it contains a unique string of your public key as well as metadata about the key, such as what algorithm it uses.

Each DS record consists of four fields: KeyTag, Algorithm, DigestType and Digest and it looks like the following:
Example.com. 3600 IN DS 2371 13 2 18e768d6gsae6g878e67se57e7as56e7gs6e5a7ge576se5

We can break up different components of the DS record to see what information each part holds:
Example.com. - domain name that the DS is for.
3600 - TTL, the time that the record may remain in cache.
IN stands for internet.
2371 - Key Tag, ID of the key.
13 - algorithm type. Each allowed algorithm in DNSSEC has a specified number. Algorithm 13 is ECDSA with a P-256 curve using SHA-256.
2 - Digest Type, or the hash function that was used to generate the digest from the public key.
The long string at the end is the Digest, or the hash of the public key.

All DS records must comply with RFC 3658.

Domain:
apex domain is...
An apex domain is a root domain that does not contain a subdomain part. Apex domains are also known as base, bare, naked, root apex, or zone apex domains. In DNS provider settings apex domains are sometimes symbolized by an @ symbol. For example:

example.com is an apex domain because it doesn't have any subdomain parts.
Whereas www.example.com is not an apex domain because it contains the subdomain part www.

Subdomain:
- A customizable and optional part of a domain name located before the root or apex domain that looks like a domain prefix. 
www subdomains
A www subdomain is the most commonly used type of subdomain, in which the www stands for World Wide Web. For example, www.example.com is a www subdomain because it contains the subdomain part www.

Custom Subdomains:
A custom subdomain is a type of subdomain that doesn't use the standard www subdomain part. It is commonly used to manage different host locations or computer servers. For example, blog in blog.example.io may be hosted on a different computer server than www.example.io or photos.example.io. GitHub Pages supports one custom subdomain per pages site.

Why is it a good rule to set up with www subdomain?
It is mostly used to separate cookies from the other subdomains.

If you are going to use cookies, definitely keep the www..

You can always use an 301 redirect to redirect the short domain to the one with www., that way your users don't have to type it.

This will allow you to create sub-domains that are cookie-less for static data serving. Without a www., cookies are served on all sub-domains. Therefore, if you are not using the www., you need a completely separate domain name to have a cookie-less domain versus just using a sub-domain.

Other than that, choosing between keeping the www. or not is just a question on which one you prefer. Just make sure to redirect the one not chosen to the other one using a 301 redirect.

For example, setting a cookie to example.com effectively allows the transfer of cookies to:

example.com
www.example.com
sub.www.example.com
my.example.com
oh.my.example.com
images.example.com
hello.example.com
Versus setting a cookie to www.example.com only allows the cookie in those situations:

www.example.com
sub.www.example.com
By using a www. you are allowing yourself to use sub-domains to have different cookies from the main site (and none at all if so desired).

Without www. (or another sub-domain), all cookies set on the domain will propagate to the sub-domains.







