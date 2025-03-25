# Riot Take-Home Technical Challenge

## Overview

This challenge requires you to build an HTTP API with 4 endpoints that handle JSON payloads for encryption, decryption, signing, and verification operations.

## Requirements

### 1. Encryption Endpoint (`/encrypt`)

- **Method**: POST
- **Input**: Any JSON payload
- **Output**: JSON payload with all properties at depth 1 encrypted
- **Encryption Algorithm**: Base64 (for simplicity)

**Example**:

Input:

```json
{
  "name": "John Doe",
  "age": 30,
  "contact": {
    "email": "john@example.com",
    "phone": "123-456-7890"
  }
}
```

Output:

```json
{
  "name": "Sm9obiBEb2U=",
  "age": "MzA=",
  "contact": "eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5j..."
}
```

### 2. Decryption Endpoint (`/decrypt`)

- **Method**: POST
- **Input**: Any JSON payload
- **Output**: Original JSON payload with decrypted values. If some properties contain values which were not encrypted, they must remain unchanged.
- **Decryption Algorithm**: Base64 (for simplicity)

**Examples**:

Using the output from the `/encrypt` example as input should return the original payload:

Input:

```json
{
  "name": "Sm9obiBEb2U=",
  "age": "MzA=",
  "contact": "eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5j..."
}
```

Output:

```json
{
  "name": "John Doe",
  "age": 30,
  "contact": {
    "email": "john@example.com",
    "phone": "123-456-7890"
  }
}
```

Unencrypted properties must remain unchanged:

Input:

```json
{
  "name": "Sm9obiBEb2U=",
  "age": "MzA=",
  "contact": "eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5j...",
  "birth_date": "1998-11-19"
}
```

Output:

```json
{
  "name": "John Doe",
  "age": 30,
  "contact": {
    "email": "john@example.com",
    "phone": "123-456-7890"
  },
  "birth_date": "1998-11-19"
}
```

### 3. Signing Endpoint (`/sign`)

- **Method**: POST
- **Input**: Any JSON payload
- **Output**: JSON payload with a unique "signature" property
- **Signature Algorithm**: HMAC
- **Important Note**: The signature must be computed based on the value of the JSON payload, not its string representation. This means the order of properties should not affect the signature.

**Examples**:

Basic example for an object with two properties:

Input:

```json
{
  "message": "Hello World",
  "timestamp": 1616161616
}
```

Output:

```json
{
  "signature": "a1b2c3d4e5f6g7h8i9j0..."
}
```

The order of properties must not change the signature, which means this example will generate the same signature:

Input:

```json
{
  "timestamp": 1616161616,
  "message": "Hello World"
}
```

Output:

```json
{
  "signature": "a1b2c3d4e5f6g7h8i9j0..."
}
```

### 4. Verification Endpoint (`/verify`)

- **Method**: POST
- **Input**: JSON payload with "signature" and "data" properties
- **Output**:
  - HTTP 204 (No Content) if signature is valid
  - HTTP 400 (Bad Request) if signature is invalid

**Examples**:

Basic example of an object with two properties:

Input:

```json
{
  "signature": "a1b2c3d4e5f6g7h8i9j0...",
  "data": {
    "message": "Hello World",
    "timestamp": 1616161616
  }
}
```

Output: 204 HTTP response

The same input object with the order of properties changed must produce the same signature:

Input:

```json
{
  "signature": "a1b2c3d4e5f6g7h8i9j0...",
  "data": {
    "timestamp": 1616161616,
    "message": "Hello World"
  }
}
```

Output: 204 HTTP response

Example when using a tampered signature or payload:

Input:

```json
{
  "signature": "a1b2c3d4e5f6g7h8i9j0...",
  "data": {
    "timestamp": 1616161616,
    "message": "Goodbye World"
  }
}
```

Output: 400 HTTP response

## Design Considerations

1. **Abstraction**: The encryption algorithm (Base64) in the `/encrypt` and `/decrypt` endpoints should be easily replaceable with another algorithm without significant changes to the codebase. Design your solution with appropriate abstractions. The same principle applies to the signature algorithm used in the `/sign` and `/verify` endpoints.

2. **Consistency**: Ensure that `/encrypt` followed by `/decrypt` returns the original payload. Ensure that a payload signed with `/sign` can be successfully verified with `/verify`.

## Submission

Please submit your completed project by sending your GitHub repository link to louis@tryriot.com.
