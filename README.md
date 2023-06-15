# Web Crawler

## Description
This is a simple web crawler that extracts all links from a specified website and saves them in a CSV file.

## Getting Started
To run the web crawler, follow the steps below:

### Prerequisites
Make sure you have Node.js installed on your system.

### Installation
1. Clone this repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Install the required dependencies by running the following command:

<h3>npm install</h3>
## Usage
To start the web crawler, use the following command:

npm start [website link]
Replace `[website link]` with the URL of the website you want to crawl.
For example:

<h3>npm start https://example.com</h3>


The web crawler will begin extracting links from the specified website and save them in a CSV file named `links.csv`. The file will be created in the root directory of the project.

## Notes
- The web crawler will only extract links from the same domain as the specified website. External links will be ignored.
- If the specified website has a large number of pages, the crawling process may take some time to complete. Be patient.
- Make sure you have proper permissions to write files in the project directory. Otherwise, the crawler may fail to create the CSV file.

## License
Feel free to modify and use it according to your needs.

## Contributing
If you encounter any issues or have suggestions for improvement, please feel free to contribute to this project.

## Acknowledgments
This web crawler was inspired by the need to extract links from websites for various purposes, such as data analysis, SEO optimization, and more.
