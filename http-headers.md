# Forbidden header names

- A forbidden header name is the name of any HTTP header that cannot be modified programmatically
  - modifying such headers is forbidden because the user agent retains full control over them
- specifically a HTTP **request** header name (in contrast with a Forbidden response header name)

- Names starting with `Sec-` are reserved for creating new headers safe from APIs using Fetch that grant developers control over headers

Forbidden header names start with Proxy- or Sec-, or are one of the following names:

- Accept-Charset
- Accept-Encoding
- Access-Control-Request-Headers
- Access-Control-Request-Method
- Connection
- Content-Length
- Cookie
- Cookie2
- Date
- DNT
- Expect
- Feature-Policy
- Host
- Keep-Alive
- Origin
- Proxy-
- Sec-
- Referer
- TE
- Trailer
- Transfer-Encoding
- Upgrade
- Via

# Request Headers

# Response Headers

## Trailer

- The TE **request header** needs to be set to "trailers" to allow trailer fields.
- allows sender to include additional fields at the end of the chunked messages

  - they could add additional fields to supply metadata that might be dynamically generated while the message body is sent
    - e.g. of such metadata are message integrity check, digital signature, or post-processing status

- A forbidden header name
