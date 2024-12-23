<h1 align="center" id="title">Samadhaan : Trivy Report Suggestions</h1>

<p align="center"><img src="https://socialify.git.ci/the-one-rvs/samadhaan/image?language=1&amp;owner=1&amp;name=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">Samadhaan is a CLI tool designed to automate the process of identifying vulnerabilities in Docker images using Trivy and generating corresponding solutions with Gemini AI.</p>

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Scans Docker images for vulnerabilities using Trivy.
*   Fetches relevant solutions for detected CVEs using Gemini AI.
*   Automates the workflow for efficient vulnerability management.
*   Gives the Modified Dockerfile too

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/your-repo/samadhaan.git 
```

<p>2. Locate to the folder</p>

```
cd samadhaan
```

<p>3. Setting up the CLI tool</p>

```
sh setup.sh
```

<p>4. Create a .env folder and get a free gemini-api and add it in .env as</p>

```
GEMINI_API_KEY=your_api_key_here
```

<p>5. Now Run the tool by running the command in terminal</p>

```
samadhaan_cli
```

<h2> Recommendations </h2>
<p2>Ensure you’re in the directory containing the Dockerfile or specify its path.</p2>


  
<h2>💻 Built with</h2>

Technologies used in the project:

*   python
*   bash
*   gemini