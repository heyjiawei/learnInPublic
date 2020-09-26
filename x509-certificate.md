# What is X.509 certificate

- An X.509 certificate is a digital certificate that uses the widely accepted international X.509 public key infrastructure (PKI) standard to verify that a public key belongs to the user, computer or service identity contained within the certificate.
  - it is to **authenticate** the user, computer or service identity contained within the certificate.
- the X.509 certificate contains information about the identity to which a certificate is issued and the identity that issued it.
- Many of the certificates that people refer to as Secure Socket Layer (SSL) certificates are in fact X.509 certificates
- X.509 certificates secure network communications of all kinds, be it Internet communications, Intranet communications, email communications or device communications.

### The certificate will contain the following information:

- Version – which X.509 version applies to the certificate (which indicates what data the certificate must include)
- Serial number – the identity creating the certificate must assign it a serial number that distinguishes it from other certificates
- Algorithm information – the algorithm used by the issuer to sign the certificate
- Issuer distinguished name – the name of the entity issuing the certificate (usually a certificate authority)
- Validity period of the certificate – start/end date and time
- Subject distinguished name – the name of the identity the certificate is issued to
- Subject public key information – the public key associated with the identity
- Extensions (optional)

## How are they used to establish secure connections between client and server for internet communication

- During SSL/TLS connections, the server authenticates according to the handshake and record protocols. When initiating the handshake protocol, the **server presents a signed X.509 certificate to the client**. Only the server needs to be validated in most secure browsing sessions.
- The X.509 certificate's signature must be verified by the client before establishing an HTTPS connection.
  - The required format and information contained in an X.509 certificate enable the client to confidently authenticate and verify the integrity of the certified identity.
- Client browsers and applications rely heavily on their trust in Certificate Authorities(CA) for proper validation of X.509 certificates. Every client application and Operating System (OS) maintains a list of trusted Root CA Certificates, this list is called a "Trust Store."
- As part of the X.509 verification process, each certificate must be signed by the same issuer CA named in its certificate. The client must be able to follow a hierarchical path of certification that recursively links back to at least one root CA listed in the client's trust store.
  - However, the certification path structure can be hierarchical (like a tree with a single source root CA) or non-hierarchical (like a forest with many cross-certified root CAs).
  - cross certification is like so: When two roots CA sign each other's certificates, they inherently trust all other certificates in each other's paths.

## X.509 certificate encoding

- X.509 does not define how certificate contents should be encoded to store in files.
- However, two commonly used encoding schemas are used to store X.509 certificates in files, DER and PEM.

### DER (Distinguished Encoding Rules)

- is a data object encoding schema that can be used to encode certificate objects.
- DER is the most popular file format to store X.509 certificates.
- DER-encoded certificates are binary files and cannot be read by text editors, but they can be processed by web browsers and some applications without any problems.

### PEM (Privacy Enhanced Mail)

- refers to base64 textual coding of the binary content of a certificate
- It is an obsolete standard
