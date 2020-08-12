# Entropy

- a measure of randomness. It is useful for determining the strength of a password.
- is measured in bits.
- If you are using probability, entropy is `log2(num of possibilities)`

The attacker knows the model of the password but not the randomness used to select a particular password.

# Crypto hash function

- maps data of arbitrary size to a fixed size
- associated with the concept of a hard-to-invert random but deterministic function

## Hash functions are

- deterministic (same input always generate same output)
- non-invertible
- target collision resistant. This means its very hard to find a different input that generates the same hash
- collision resistant. This means its hard to find 2 inputs that generate the same hash.

- SHA-1 hash is no longer considered a strong cryptographic hash function.

### Application of hash functions outside crypto

- using hash to verify content is the same.
- commitment schemes https://en.wikipedia.org/wiki/Commitment_scheme

# Key derivation functions (KDFs)

- produce fixed-length output to be used as keys in other cryptographic algorithms.
- KDFs are also deliberately slow in order to slow down offline brute-force attacks

### Application of KDF

- they can be used for storing login credentials. Each user has a random salt generated. The password is then stored KDF(password + salt). On login, the system verifies login attempts by recomputing the KDF given the entered password and stored salt.
- Encrypting files for storage in an untrusted cloud service. This can be combined with KDFs, so you can encrypt a file with a passphrase. Generate key = KDF(passphrase), and then store encrypt(file, key)

# Symmetric Cryptography

```
keygen() -> key  (this function is randomized)

encrypt(plaintext: array<byte>, key) -> array<byte>  (the ciphertext)
decrypt(ciphertext: array<byte>, key) -> array<byte>  (the plaintext)
```

# Asymmetric Cryptography

- The term “asymmetric” refers to there being two keys, with two different roles.
- A private key, as its name implies, is meant to be kept private, while the public key can be publicly shared and it won’t affect security (unlike sharing the key in a symmetric cryptosystem).

```
keygen() -> (public key, private key)  (this function is randomized)

encrypt(plaintext: array<byte>, public key) -> array<byte>  (the ciphertext)
decrypt(ciphertext: array<byte>, private key) -> array<byte>  (the plaintext)

sign(message: array<byte>, private key) -> array<byte>  (the signature)
verify(message: array<byte>, signature: array<byte>, public key) -> bool  (whether or not the signature is valid)
```

### Symmetric and asymmetric encryption can be compared to physical locks.

- A symmetric cryptosystem is like a door lock: anyone with the key can lock and unlock it.
- Asymmetric encryption is like a padlock with a key. You could give the unlocked lock to someone (the public key), they could put a message in a box and then put the lock on, and after that, only you could open the lock because you kept the key (the private key).

### Asymmetric key cryptography challenge

- big challenge of distributing public keys / mapping public keys to real-world identities.

- There are many solutions to this problem.
  - Apps like Signal has one simple solution: trust on first use, and support out-of-band public key exchange (you verify your friends’ “safety numbers” in person).
  - Pretty Good Privacy (PGP) has a different solution, which is web of trust.
    - OpenPGP identity certificates (which include one or more public keys along with owner information) can be digitally signed by other users who, by that act, endorse the association of that public key with the person or entity listed in the certificate.
  - Keybase has yet another solution of social proof ?? (along with other neat ideas).
  - Each model has its merits

# Password Managers

- Password managers let you use unique, randomly generated high-entropy passwords for all your websites, and they save all your passwords in one place, encrypted with a symmetric cipher with a key produced from a passphrase using a KDF.

- Using a password manager lets you avoid password reuse (so you’re less impacted when websites get compromised), use high-entropy passwords (so you’re less likely to get compromised), and only need to remember a single high-entropy password.

# Full disk encryption

- Keeping your laptop’s entire disk encrypted is an easy way to protect your data in the case that your laptop is stolen. You can use cryptsetup + LUKS on Linux, BitLocker on Windows, or FileVault on macOS. This encrypts the entire disk with a symmetric cipher, with a key protected by a passphrase.

# SSH

- When you run ssh-keygen, it generates an asymmetric keypair, public_key, private_key. This is generated randomly, using entropy provided by the operating system
- The public key is stored as-is, but at rest, the private key should be encrypted on disk
- The ssh-keygen program prompts the user for a passphrase, and this is fed through a key derivation function to produce a key. This produced key is then used to encrypt the private key with a symmetric cipher.
- In use, once the server knows the client’s public key (stored in the .ssh/authorized_keys file), a connecting client can prove its identity using asymmetric signatures.
- This is done through challenge-response.
  - a challenge–response authentication is a family of protocols in which one party presents a question ("challenge") and another party must provide a valid answer ("response") to be authenticated.
- At a high level, the server picks a random number and sends it to the client. The client then signs this message and sends the signature back to the server, which checks the signature against the public key on record
- This effectively proves that the client is in possession of the private key corresponding to the public key that’s in the server’s .ssh/authorized_keys file, so the server can allow the client to log in.
