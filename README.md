# Employability Analytics Application

This repository contains resources related to the Master's Research Project (MRP) titled **"Building an Employability Analytics Application for Job Seekers/Mid-Career Professionals."**

## Table of Contents


- [Project Overview](#project-overview)
- [Contents](#contents)
- [Technologies Used](#technologies-used)
- [How to Run the Application](#how-to-run-the-application)
- [Power BI Dashboard](#power-bi-dashboard)
- [Data Validation Notebook](#data-validation-notebook)
- [Project Team](#project-team)

---

## Project Overview

The project aims to assist job seekers and mid-career professionals in understanding job market trends and enhancing employability by offering interactive analytics and data-driven insights through a web-based application and visual dashboard.

---

## Contents

| File Name                 | Description                                              |
|--------------------------|----------------------------------------------------------|
| `MRP_application folder`     | Contains the source code for the full-stack web app      |
| `MRP.pbix`                | Power BI dashboard that visualizes job analytics         |
| `Data Validation.ipynb`   | Jupyter notebook for validating and preparing the dataset|

---

## Technologies Used

### Application Stack
- **Frontend**: React.js (Vite)
- **Backend**: Node.js + Express
- **Data Source**: CSV-based job dataset
- **Visualization**: Recharts, Power BI

### Supporting Tools
- Jupyter Notebook (for data validation and cleaning)
- Power BI (for building dashboards)

---

## How to Run the Application

1. Open MRP_application folder
2. Run the following commands:

```bash
npm install        # Install dependencies
npm run dev        # Start the development server

3. The application should be live at http://localhost:3000.

# Power BI Dashboard
1. To view the dashboard:
2. Open MRP.pbix in Power BI Desktop.
3. Ensure the required dataset is accessible.
4. Use filters to explore employability metrics.

# Data Validation Notebook
1. To run the Jupyter notebook:
2. Open Data Validation.ipynb in JupyterLab or Jupyter Notebook.
3. Install required libraries (e.g., pandas, numpy) if not already installed.
4. Follow the cells to validate, clean, and understand the dataset.
