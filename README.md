# YouTube Analytics Web App

This web application allows users to perform analytics on YouTube channels, retrieving data such as video statistics and channel information using the YouTube Data API. The application is built using TypeScript and React.

## Features

1. **Login Functionality:**

   - Access to the app is restricted via a login system. The CEO has a dedicated login using a password.

2. **Search for YouTube Channels:**

   - Users can search for YouTube channels using a dedicated search form.

3. **View Channel Statistics:**

   - The app provides a dashboard that displays key statistics for a selected YouTube channel.
   - Statistics include the total number of visits, videos, and subscribers.

4. **List and Paginate Videos:**

   - Users can view a paginated list of videos for a selected channel.
   - The list includes information such as video thumbnails, titles, upload dates, and view counts.

5. **Sort Videos:**
   - The video list can be sorted based on various criteria, including recent, oldest, more views, and less views.

## Technologies Used

- **React:** The frontend is built using React to create a dynamic and responsive user interface.

- **TypeScript:** TypeScript is used to bring static typing to JavaScript, enhancing code maintainability.

- **Sass:** Styling is implemented using Sass for better organization and maintainability of styles.

- **YouTube Data API:** The app leverages the YouTube Data API to fetch channel and video information.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone [repository_url]
   cd [repository_folder]
   ```

## Install Dependencies

````bash
npm install

## Set Up Environment Variables

```bash
1. Create a `.env` file in the root directory.
2. Add your YouTube Data API key as `REACT_APP_YOUTUBE_API_KEY=your_api_key`.

## Run the app

```bash
npm start

The app will be accessible at http://localhost:3000.

## Additional Notes

- **Authentication:**
  - Only the CEO has access to the application using a password (currently set as "raven").

- **Security:**
  - Ensure that sensitive information such as API keys is handled securely.

- **Pagination:**
  - The video list is paginated to enhance user experience.

- **Error Handling:**
  - The application includes robust error handling for API requests, ensuring a smooth user experience even in case of failures.

````
