### API Key Management System

This project provides an API for creating and deleting API keys securely. It includes endpoints for managing API keys and implements authentication to ensure secure access.

#### Features

- **Create API Key**: Endpoint to create an API key with a human-readable name, creator, and key representation.
- **Delete API Key**: Endpoint to delete an API key. Requires authentication to ensure only the creator can delete their keys.
- **Persistent Data Storage**: Data is stored persistently even if the server is shut down, ensuring data integrity.

#### Endpoints

- **Create API Key**
  - **Endpoint**: `/api/key/create`
  - **Method**: POST
  - **Request Body**: 
    ```json
    {
      "name": "dev1",
      "creator": "Jim"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "API key created successfully.",
      "api_key": "generated_api_key"
    }
    ```

- **Delete API Key**
  - **Endpoint**: `/api/key/delete`
  - **Method**: DELETE
  - **Request Headers**:
    ```
    Authorization: Bearer <session_token>
    ```
  - **Request Body**: 
    ```json
    {
      "name": "dev1"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "API key deleted successfully."
    }
    ```

#### Security Enhancement

a session-based authentication mechanism is introduced. Users must sign up with a username/password, and requests to create/delete API keys must be authenticated with a session token. Each session token expires after 10 requests, enhancing security.

