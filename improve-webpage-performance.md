How to improve performance from Alex Lakatos performance profiling session of shopee's website:
1. Use HTTP 2 if possible. Don't use both HTTP 1 and HTTP 2
2. Use as few domains as you can. This can reduce the blocking time for HTTP 2 (if more than 6 domains, HTTP 2 will need to wait for a tunnel to close before it can open a new one)
3. Use web workers instead of promises to load assets to be used
4. return assets of the right size  (right ratio)
5. Use webp instead of jpeg
6. It's the transfer size (gzipped) that contributes to download speed
7. Don't use too many promises
8. Use less in-line styling OR have it styled all at one go. This will keep causing the DOM to be repainted and be slow (and have that flashing effect)
9. Javascript browser memory footprint keeps growing unless an item is specifically deleted with the delete keyword. If uses stick to the site for a long time, navigating to more pages can cause consume more memory and eventually cause performance issue.
