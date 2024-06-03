# Cryptography API

This project contains APIs for data encryption and hashing.

## Installation

1. Clone this repository to your local machine.
2. Ensure you have Node.js installed on your system.
3. Run `npm install` to install all necessary dependencies.

## Usage

```npm run dev```

### Encryption API

- **POST /encrypt**: Encrypts the provided JSON data.

Example usage with cURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"foo": "bar"}' http://localhost:3000/encrypt
```

- **POST /decrypt**: Decrypts the provided encrypted JSON data.

Example usage with cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"encryptedData": "encrypted_string"}' http://localhost:3000/decrypt
```

### Signature API
- POST **/sign**: Generates an HMAC signature for the provided JSON data.

Example usage with cURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"foo": "bar"}' http://localhost:3000/sign
```

- POST **/verify**: Verifies an HMAC signature for the provided JSON data.

Example usage with cURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"signature": "computed_signature", "data": {"foo": "bar"}}' http://localhost:3000/verify
```
### Tests
To run the tests, use the following command:

```npm test```

# Riot Takehome Task Specification

Your task is to implement a REST API which:

1. Has two endpoints `/encrypt` and `/decrypt`. Each endpoint should take
a JSON payload.
2. Use **Base64** to implement encryption and decryption on the
`/encrypt` and `/decrypt` endpoints respectively.
   - `/encrypt` should encrypt every value in the object (at a depth of 1), returning the encrypted payload as JSON.
   - `/decrypt` should detect encrypted strings and decrypt them, returning the decrypted payload as JSON.

   For example:
   ```JSON
   {
     "foo": "foobar",
     "bar": {
       "isBar": true
     }
   }
   ```
   would become
   ```JSON
   {
     "foo": "some_encrypted_string",
     "bar": "some_encrypted_string"
   }
   ```
3. The **Base64** encryption algorithm should be easily replaceable with another algorithm without requiring significant changes to the codebase.
4. Create a `/sign` endpoint which takes a JSON payload and computes a
cryptographic signature for the plaintext payload in HMAC. The signature is then
sent in a JSON response.
5. Create a `/verify` endpoint, which takes a JSON payload of the form
```js
{
   "signature": "<COMPUTED_SIGNATURE>",
   "data": {
      // ...
   }
}
```
- Data can be any JSON object and can contain encrypted fields.
- If the provided signature matches the computed signature, the response code should be `204`; otherwise, it should be `400`.


Send me the project, your GitHub repository by email louis@tryriot.com.
