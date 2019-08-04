 without HTTPS, you can get attacked.
 - For example, someone can open a public WiFi, you open a HTTP browser, the person could pretend to be the WiFI and get the requests you sent.

 HTTPS
 - allows you to use HTTP/2, service workers and media

 When you run on HTTPS, ensure it is always on HTTPS and on a secure connection.
 
 How?
1. set the HSTS (HTTP Strict Transport Security header). This will tell the browser to only use this website/resources over HTTPS
```
Strict-Transport-Security: max-age=1000
```

2. you can go further and submit your site to hstspreload.org. This list of sites are hardcoded into Chrome as being HTTPS only. 
- most major browsers also have HSTS preload list based on the Chrome list (the configuration file is in Chromuium)
- sites in this list will never work on HTTP

- **HSTS list also helps improve website performance**. It allows browsers to skip HTTP request becuase the browser knows it's HTTPS.

How do you ensure your website it always on HTTPS? This is especially though for big websites with many developers.
- You can set a content security policy header with the directive. This would update all requests to be HTTPS 
```
Content-Security-Policy: upgrade-insecure-requests
```
The main purpose of CSP (Content Security Policy) is to limit what is allowed in your website. (i.e. where your fonts, images are loaded from. More at developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

Set a different header 'report-only'. This would allow you to define a HTTP end point. You would then get all the warnings of which requests would be blocked if this would be active.
```
Content-Security-Policy-Report-Only: report-uri https://stefanjudis.report-uri.com/r/d/csp/reportOnly
```

**Before you get onboard CSP, 
monitor your CSP reports and test in production with report-only mode 
before enforcing them**


Caching: csswizardry.com/2019/03/cache-control-for-civilians


Compression algorithm GZIP vs Brotli:
- GZIP has 9 modes, Brotli has 11
- by default, GZIP compresses at level 6. Brotli compresses at 11 (the maximum level).
If you adjust Brotli to level 4, it would be similar to GZIP at level 6, and the compression rate is 
even better.

Read more at: blogs.akamai.com/2016/02/understanding-brotlis-potential.html


WebP or Jpeg?
- Usually we do feature detection in the HTML. We can do better.
The browsers today tells the server what image formats they will be sending.
```
Accept: image/webp, image/apng, image/*, */*;q=0.8
```
We can use the request headers to tailor the images served to clients.


Some more pretty cool request headers (the following can be used for SSR)
```
Accept-CH: Width, Viewport-Width
Accept-CH-Lifetime: 100
```
With this, for the additional images request, the browser will tell you the dimensions of the image. 
**You would have to give the image a size attribute though**
When you are on a high pixel resolution display, it will tell you the real size of the image.

Read more at: speaking.jeremy.codes/yD4dKY/take-a-client-hint


Preloading resources (to speed up loading critical resources)
```
<link rel="preload" href="/jsconfeu.png" as="image">

# in header
Link: </jsconfeu.png>; rel=preload; as=image; no-push
```

More about HTTP headers at: schepp.github.io/HTTP-headers
Andrew Betz headers for hackers