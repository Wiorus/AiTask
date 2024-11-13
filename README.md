# Article Generator

Welcome to the Article Generator app! This application reads a text file with an article, processes it using the OpenAI API to generate HTML content, and saves the generated HTML in a new file.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js] (recommended LTS version)
- [npm] (usually comes with Node.js)
- An API key from OpenAI to access their services.

## Installation

1. Download or clone this repository to your computer.

2. Navigate to the project directory in your terminal.

3. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Open the index.js file.

2. Replace the placeholder for apiKey in the generateHTMLFromAI function with your actual OpenAI API key.

## Running

To generate HTML from the article text, execute the following command:

   ```bash
   node index.js
   ```

The application will:

- Read the article from artykul.txt.
- Send the article to the OpenAI API, asking it to generate structured HTML content.
- Save the HTML content in artykul.html.
