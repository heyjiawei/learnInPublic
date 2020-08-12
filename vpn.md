# VPN

- A VPN, in the best case, is really just a way for you to change your internet service provider as far as the internet is concerned. All your traffic will look like it’s coming from the VPN provider instead of your “real” location, and the network you are connected to will only see encrypted traffic.
- While that may seem attractive, keep in mind that when you use a VPN, all you are really doing is shifting your trust from you current ISP to the VPN hosting company. Whatever your ISP could see, the VPN provider now sees instead.
- If you are sitting on some dodgy unencrypted public Wi-Fi at an airport, then maybe you don’t trust the connection much, but at home, the trade-off is not quite as clear.

- these days, much of your traffic, at least of a sensitive nature, is already encrypted through HTTPS or TLS more generally. In that case, it usually matters little whether you are on a “bad” network or not – the network operator will only learn what servers you talk to, but not anything about the data that is exchanged.

- It is not unheard of for VPN providers to accidentally misconfigure their software such that the encryption is either weak or entirely disabled.
- Some VPN providers are malicious (or at the very least opportunist), and will log all your traffic, and possibly sell information about it to third parties. Choosing a bad VPN provider is often worse than not using one in the first place.

- If you are going to roll your own VPN, look into [wireguard](https://www.wireguard.com/)
