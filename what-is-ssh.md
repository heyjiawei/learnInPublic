What is SSH
- Designed as a replacement to Telnet which provides unsecured remote shell access
- Allows for password logins and private/public key-based logins which are more secure
- With SSH keys, users can log into a server without a password

Some tricks you can do with SSH
- Run a single command remotely
- Secure file transfer (via scp or WinSCP)
- Port forwarding, SOCKS proxy or tunnel
- SSHFS – userspace filesystem which uses SSH
	- SSHFS allows you to mount a remote filesystem using SFTP. Most SSH servers support and enable this SFTP access by default, so SSHFS is very simple to use - there's nothing to do on the server-side.

SSH key authentication can be more convinent than traditional password authentication. 
- When used with a program known as SSH agent, SSH keys acan allow you to connect to a server, or multiple servers, without having to remember or enter your password for each system.

The SSH Connection Process
- In order to secure the transmission of information, SSH employs a number of different types of data manipulation techniques at various points in the transaction. 
- These include forms of symmetrical encryption, asymmetrical encryption, and hashing.

Symmetrical Encryption
- is a type of encryption where one key can be used to encrypt messages to the opposite party, and also to decrypt the messages received from the other participant. 
- This means that anyone who holds the key can encrypt and decrypt messages to anyone else holding the key.

- This type of encryption scheme is often called "shared secret" encryption, or "secret key" encryption. 
- It could be a single key that is used for all operations, or a pair of keys where the relationship is easy to discover and it is trivial to derive the opposite key.

- **Public/private asymmetrical key pairs that can be created are only used for authentication. They are  not used to encrypt the connection. Symmetric keys are used to encrypt the entire connection**

- The client and server both contribute toward establishing this (symmetric) key, and the resulting secret is never known to outside parties. 
	- The secret key is created through a process known as a key exchange algorithm. 
	- This exchange results in the server and client both arriving at the same key independently by sharing certain pieces of public data and manipulating them with certain secret data.
	- The symmetrical encryption key created by this procedure is session-based and constitutes the actual encryption for the data sent between server and client. 
	- Once this is established, the rest of the data must be encrypted with this shared secret. 
	- This is done prior to authenticating a client.

Do note that the private key is a guarded secret. 
- It is advisable to store the private key on disk in an encrypted form.
- When the encrypted private key is required, a passphrase must first be entered in order to decrypt it.
- It might appear as though you are providing a login password to the SSH server but the passphrase is only used to decrypt the private key on the local system
- The passphrase is never transmitted over the network


SSH can be configured to utilize a variety of different symmetrical cipher systems, including AES, Blowfish, 3DES, CAST128, and Arcfour. 

- The server and client can both decide on a list of their supported ciphers, ordered by preference. 
- The first option from the client's list that is available on the server is used as the cipher algorithm in both directions.
On Ubuntu 14.04, both the client and the server are defaulted like this: aes128-ctr, aes192-ctr, aes256-ctr, arcfour256, arcfour128, aes128-gcm@openssh.com, aes256-gcm@openssh.com, chacha20-poly1305@openssh.com, aes128-cbc, blowfish-cbc, cast128-cbc, aes192-cbc, aes256-cbc, arcfour.
This means that if two Ubuntu 14.04 machines are connecting to each other (without overriding the default ciphers through configuration options), they will always use the aes128-ctr cipher to encrypt their connection for that cipher is the first default cipher.

Asymmetrical Encryption
- is different from symmetrical encryption in that to send data in a single direction
- Two associated keys are needed. 
One of these keys is known as the private key, while the other is called the public key
The mathematical relationship between the public key and the private key allows the public key to encrypt messages that can only be decrypted by the private key. This is a one-way ability, meaning that the public key has no ability to decrypt the messages it writes, nor can it decrypt anything the private key may send it.
SSH utilizes asymmetric encryption in a few different places. During the initial key exchange process used to set up the symmetrical encryption (used to encrypt the session), asymmetrical encryption is used. 
In this stage, both parties produce temporary key pairs and exchange the public key in order to produce the shared secret that will be used for symmetrical encryption.

The commonly discussed use of asymmetrical encryption with SSH comes from SSH key-based authentication



SSH key pairs can be used to authenticate a client to a server. 

The process works as follows:
1. The client creates a key pair and then uploads the public key to any remote server it wishes to access. 
The public placed in a file called authorized_keys within the ~/.ssh directory in the user account's home directory on the remote server.

2. After the symmetrical encryption is established to secure communications between the server and client, the client must authenticate to be allowed access. 
The server can use the public key in this file to encrypt a challenge message to the client. 
If the client can prove that it was able to decrypt this message, it has demonstrated that it owns the associated private key. The server then can set up the environment for the client.


Hashing
- Cryptographic hash functions are methods of creating a succinct "signature" or summary of a set of information. 
- Their main distinguishing attributes are that they are never meant to be reversed, and the generated hashes are virtually impossible to predict
- They are practically unique.

Using the same hashing function and message should produce the same hash
- Modifying any portion of the data should produce an entirely different hash. A user should not be able to produce the original message from a given hash, but they should be able to tell if a given message produced a given hash.

- Hashes are mainly used for data integrity purposes and to verify the authenticity of communication. 
- The main use in SSH is with HMAC (hash-based message authentication codes). These are used to ensure that the received message text is intact and unmodified.

As part of the symmetrical encryption negotiation outlined above, a **message authentication code (MAC)** algorithm is selected. 
- The algorithm is chosen by working through the client's list of acceptable MAC choices. The first one out of this list that the server supports will be used.
- Each message that is sent after the encryption is negotiated must contain a MAC so that the other party can verify the packet integrity. 
- The MAC is calculated from the symmetrical shared secret, the packet sequence number of the message, and the actual message content.

The MAC itself is sent outside of the symmetrically encrypted area as the final part of the packet. Researchers generally recommend this method of encrypting the data first, and then calculating the MAC.
This means: 
- The message is encrypted with symmetrical encryption first. 
- Then, the MAC is calculated and attached to the encrypted message. All this is done in 1 packet.


How does SSH work?
The SSH protocol employs a client-server model to authenticate two parties and encrypt the data between them.
The server component listens on a designated port for connections. It is responsible for negotiating the secure connection, authenticating the connecting party, and spawning the correct environment if the credentials are accepted.
The client is responsible for beginning the initial TCP handshake with the server, negotiating the secure connection, verifying that the server's identity matches previously recorded information, and providing credentials to authenticate.
An SSH session is established in two separate stages. 
The first is to agree upon and establish encryption to protect future communication. 
The second stage is to authenticate the user and discover whether access to the server should be granted.

Negotiating Encryption for the Session
When a TCP connection is made by a client, the server responds with the protocol versions it supports. 
If the client can match one of the acceptable protocol versions, the connection continues. 
The server provides its public host key, which the client then use to check if it has connected to its intended host.
At this point, both parties start negotiating a session key using a version of something called the Diffie-Hellman algorithm. 
This algorithm (and its variants) make it possible for each party to combine their own private data with public data from the other system to arrive at an identical secret session key.
The session key will be used to encrypt the entire session. The public and private key pairs used for this part of the procedure are different from the SSH keys used to authenticate a client to the server.

The basis of this procedure for classic Diffie-Hellman is:
Both parties agree on a large prime number, which will serve as a seed value.
Both parties agree on an encryption generator (typically AES), which will be used to manipulate the values in a predefined way.
Independently, each party comes up with another prime number which is kept secret from the other party. This number is used as the private key for this interaction (different than the private SSH key used for authentication).
The generated private key, the encryption generator, and the shared prime number are used to generate a public key. This generated public key can be shared with the other party.
Both participants then exchange their generated public keys.
The receiving entity uses their own private key, the other party's public key, and the original shared prime number to compute a shared secret key. 
Although both public keys are independently computed by each party, using the counterparty private and public keys, will result in the same shared secret key.
The shared secret is then used to encrypt all communication that follows.
The shared secret encryption that is used for the rest of the connection is called binary packet protocol. 
The above process allows each party to equally participate in generating the shared secret, which does not allow one end to control the secret. 
It also accomplishes the task of generating an identical shared secret without ever having to send that information over insecure channels.
The generated secret is a symmetric key, meaning that the same key used to encrypt a message can be used to decrypt it on the other side. The purpose of this is to wrap all further communication in an encrypted tunnel that cannot be deciphered by outsiders.
After the session encryption is established, the user authentication stage begins.

Authenticating the User's Access to the Server
There are a few different methods that can be used for authentication, based on what the server accepts.
The simplest is probably password authentication, in which the server simply prompts the client for the password of the account they are attempting to login with. 
The password is sent through the negotiated encryption, so it is secure from outside parties.
Even though the password will be encrypted, this method is not generally recommended due to the limitations on the complexity of the password. 
Automated scripts can break passwords of normal lengths very easily compared to other authentication methods.
The most popular and recommended alternative is the use of SSH key pairs. SSH key pairs are asymmetric keys, meaning that the two associated keys serve different functions.
The public key is used to encrypt data that can only be decrypted with the private key. 
The public key can be freely shared, because, although it can encrypt for the private key, there is no method of deriving the private key from the public key.
Authentication using SSH key pairs begins after the symmetric encryption has been established as described in the last section.
