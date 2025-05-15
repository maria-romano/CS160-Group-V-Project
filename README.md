
![Group 48](https://github.com/user-attachments/assets/c93309b6-278e-4743-932d-0a126b03a5c2)


## WHAT IS DONORLOOP
DonorLoop helps nonprofits build donor trust by transforming complex IRS 990 forms into clear, visual insights. Using Reagent to parse and analyze the I-990 form, the platform extracts key financial metrics and automatically generates intuitive dashboards for users to customize how they want to view their NGO's data. In addition, our interface allows users to create posts with the intention of updating their donors about their NGO.

## HOW TO RUN THIS CODE

1. git clone this
2. open up Terminal and cd into the directory!
3. cd into the my-app folder
4. run "npm install" then run "npm run dev"
5. go visit https://localhost:5173 with your web browser!
 

## INSTRUCTIONS ON HOW TO USE DONORLOOP
1. Creating an Account
   - Input an username, email address, and password (make sure the password is at least 6 characters and the same when retyping the password)
   - Click agree with terms and join to finish the account creation process
2. Profile Setup
   - Upload an image for your profile picture here:

     <img width="143" alt="Screenshot 2025-05-14 at 9 04 30 PM" src="https://github.com/user-attachments/assets/58815f27-b51d-48a2-ad55-eb8b8de684ff" />
   - In the “Tell us about your organization’s mission” box, write a description of your mission.
   - In the “Where do you want to direct your funds?” box, describe your funding goals and priorities.
   - Under “What causes does your organization primarily support?”, click to select all the tags that apply (e.g., Animals, Education, Human Rights).
   - Click next once completed.
3. Upload Your 990 Form
   - Click the upload box or drag your file into the dotted area.
   - Once uploaded, the Continue button will become clickable and you can move on.
6. Dashboard
   - On the right panel, choose what you want to see by checking boxes under Donation Insights or NGO Insights.
   - Click “Select All” to display all metrics in each section — or select individual ones like Total Donations or Net Assets.
   - After selecting, scroll down the main area (left side of the screen) to view the corresponding charts and stats.
   - Note: If a chart seems missing, try scrolling — it may appear lower on the page than expected.
8. Profile
   - From your profile page, click the "Create Post" button.
   - Fill in the Title and Description for your post, then click Next.
   - Upload or drag an image you want to include in your post, then click Next.
   - On the preview screen, customize the font, size, or style of your title and description. Click Next when done.
   - Review your post. If everything looks good, click Post to publish it.


## AI Backend
Our platform leverages [Reagent](https://rea.gent/noggins/yappiest-bovid-3112/edit) to transform complex IRS 990 forms into actionable insights. This integration automates what would typically be a manual and time-consuming process of analyzing nonprofit financial data.
How it Works

PDF Processing: When users upload their IRS 990 form as a PDF during the onboarding process, our system converts the document to text format.
AI Analysis: The extracted text is sent to Reagent, which parses the unstructured data and identifies key financial metrics and organizational information.
JSON Generation: Reagent processes the form data and returns a structured JSON response containing critical financial metrics such as:

Net assets
Revenue streams
Expense categories
Program service accomplishments
Key financial ratios


Dashboard Visualization: The JSON data is then used to automatically populate the dashboard with customized charts and visualizations, giving users immediate insights into their organization's financial health.

## Implementation Details
The current implementation includes a workflow that converts PDF documents to text, processes them through Reagent, and uses the resulting structured data to generate dynamic visualizations. While the system currently relies on specific formatting steps, future iterations will include automated pipelines to handle various 990 form formats seamlessly.
This AI integration significantly reduces the barrier for nonprofits to share their financial transparency with donors, turning what was once a complex regulatory document into an accessible, visual story of their impact.
