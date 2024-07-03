/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import "./App.css";

function App() {
  return (
    <div
      className="popup-cont"
      style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}
    >
      <h2>Hello There! 👋</h2>
      <p>
        Thank you for using this tool to filter builds on Jenkins. I hope it
        makes your workflow smoother and more efficient.
      </p>

      <h3>Overview</h3>
      <p>
        Jenkins Genie is designed to help you easily filter your Jenkins builds
        based on Branch, User, Status or Date values directly within the
        webpage, making it easier to find the information you need.
      </p>

      <h3>How to Use</h3>
      <ol>
        <li>
          Navigate to the URL that matches the pattern:
          <ul>
            <li>
              <code>https://*.runwayci.com/job/*/</code>
            </li>
            <li>
              <code>https://*.runwayci.com/view/Automation/job/*/</code>
            </li>
          </ul>
        </li>
        <li>
          The extension will automatically inject the filtering tool into the
          webpage.
          <img src="screenshot.png" alt="" width="100%" />
        </li>
        <li>
          CLick on the "Filter builds" button as shown above and use the
          provided interface to filter the builds based on Branch, User, Status
          or Date values.
        </li>
      </ol>
      <h3>Feedback and Suggestions</h3>
      <p>
        I would love to hear your feedback and suggestions on how to improve
        this tool. Please feel free to reach out with your thoughts.
      </p>
      <h3>Developer</h3>
      <p>Built with ❤️ by Triveniprasad Gupta.</p>
    </div>
  );
}

export default App;
