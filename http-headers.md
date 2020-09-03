# Request Headers

# Response Headers

## Trailer

- The TE **request header** needs to be set to "trailers" to allow trailer fields.
- allows sender to include additional fields at the end of the chunked messages

  - they could add additional fields to supply metadata that might be dynamically generated while the message body is sent
    - e.g. of such metadata are message integrity check, digital signature, or post-processing status

- A forbidden header name
