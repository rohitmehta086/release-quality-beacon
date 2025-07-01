
# Release Build Quality Dashboard

A comprehensive web application for analyzing and visualizing release build quality metrics based on Test Run Details and Bug Reports data from Excel files.

## Features

- 📊 **Interactive Dashboard**: Visual analytics for test run data and bug reports
- 📈 **Test Case Pass Rate Analysis**: Track pass rates across different releases
- 🐛 **Bug Trends Visualization**: Monitor bug counts, severity levels, and status
- 📉 **Test Run Bug Analysis**: Analyze bug distribution across test runs
- 📁 **Excel File Upload**: Support for .xlsx files with flexible column naming
- 🎨 **Responsive Design**: Modern UI built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **File Processing**: xlsx library
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (usually comes with Node.js)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd release-build-quality-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## Usage

### File Upload
1. Navigate to the Dashboard page
2. Upload your Excel files:
   - **Test Run Details**: Should contain columns like TestRunID, Release, TestCasesTotal, TestCasesPassed, etc.
   - **Bug Reports**: Should contain columns like BugID, TestRunID, Severity, Status, etc.

### Supported Excel Column Names
The application supports flexible column naming. It will automatically detect and map columns with these variations:

**Test Run Data:**
- Test Run ID / TestRunID / testRunId
- Release / release / Version
- Test Cases Total / TestCasesTotal / total
- Test Cases Passed / TestCasesPassed / passed
- Test Cases Failed / TestCasesFailed / failed
- Pass Rate / PassRate
- Execution Date / ExecutionDate / date

**Bug Report Data:**
- Bug ID / BugID / id
- Test Run ID / TestRunID / testRunId
- Severity / severity
- Status / status
- Reported Date / ReportedDate / date
- Closed Date / ClosedDate
- Description / description

### Dashboard Metrics

The dashboard provides three main visualizations:

1. **Test Case Pass Rate by Release**: Line chart showing average pass rates across different releases
2. **Bug Trends Overview**: Summary cards displaying total bugs, high severity bugs, closed bugs, and open bugs
3. **Bug Count per Test Run**: Bar chart showing the number of bugs found in each test run

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── BugCountChart.tsx
│   ├── BugTrendsChart.tsx
│   ├── MetricsOverview.tsx
│   └── TestRunChart.tsx
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/               # TypeScript type definitions
│   └── dashboard.ts
├── utils/               # Utility functions
│   └── dataAnalysis.ts
└── App.tsx             # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.
