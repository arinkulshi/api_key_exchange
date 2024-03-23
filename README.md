### API Key Management System



This project provides an API for creating and deleting API keys securely. It includes endpoints for managing API keys and implements authentication to ensure secure access.

#### Backend Features 

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




### Security Concerns

a session-based authentication mechanism is introduced. Users must sign up with a username/password, and requests to create/delete API keys must be authenticated with a session token. Each session token expires after 10 requests, enhancing security.



#### Frontend 

- Contains the following components and logic:

  - **Modal Component**: A modal that appears over the video asking the user to confirm their purchase. This modal should include:
    - Video title
    - Purchase price
    - PIN input field
    - Confirm button

  - **Data Fetching**: Fetch video information from the server using a `GET` request to `http://localhost:5001/video/info`. Based on the response, determines whether the video is purchased or not.

  - **Purchase Logic** Contains logic to purchase the video using a `POST` request to `http://localhost:5001/video/purchase`. and handles the response accordingly, especially if the purchase is in the "waiting" state.

  - **Video Player Integration**: Once the video is purchased, load the player either directly or after confirming the purchase through the modal.




