
# RNAlytics

## Project Overview
This repository contains an in-depth analysis of RNA-seq data comparing the effects of **Cyclosporin A (CsA)** and **Voclosporin (VOC)** treatments against control groups. The study utilizes iPathwayGuide to highlight differentially expressed genes (DEGs), pathway impacts, and biological processes affected by these treatments.

---

## Objectives
1. Analyze significant DEGs in CsA- and VOC-treated samples versus controls.
2. Explore disrupted pathways and enriched biological processes using KEGG and GO databases.
3. Highlight upstream regulators, diseases, and organ-specific signatures affected by the treatments.
4. Compare the systemic and specific effects of CsA and VOC.

---

## Key Comparisons

### **Treatment and DEGs**
| Attribute        | CsA vs Control         | VOC vs Control         |
|------------------|------------------------|------------------------|
| **Treatment**    | Cyclosporin A (CsA)    | Voclosporin (VOC)      |
| **Number of DEGs** | 1,492                | 489                    |
| **FDR Threshold** | 0.05                 | 0.05                   |
| **Genes Measured** | Total: 15,359        | Total: 15,359          |

### **Top Pathways**
| Pathway Name                      | CsA vs Control (FDR)    | VOC vs Control (FDR)    |
|-----------------------------------|-------------------------|-------------------------|
| **Protein Processing in the ER**  | Significant             | **Most Significant (2.604e-16)** |
| **Cell Cycle**                    | **Most Significant (2.788e-17)** | Significant (1.002e-6) |
| **DNA Replication**               | 7.860e-9               | 2.099e-6               |
| **Oocyte Meiosis**                | 7.882e-4               | N/A                    |
| **Base Excision Repair**          | N/A                    | 0.011                  |

### **Gene Ontology (GO) Terms**
| Attribute                | CsA vs Control                        | VOC vs Control                        |
|--------------------------|---------------------------------------|---------------------------------------|
| **Total Significant Terms** | 1,134                              | 1,024                                 |
| **Biological Processes** | Chromosome organization, DNA unwinding | Chromosome organization, DNA replication |
| **Molecular Functions**  | DNA helicase activity, ATP binding    | Unfolded protein binding, ssDNA helicase |
| **Cellular Components**  | Chromosomal regions, condensed chromosomes | Endoplasmic reticulum protein complexes |

### **Upstream Regulators and Diseases**
| Attribute              | CsA vs Control             | VOC vs Control             |
|------------------------|----------------------------|----------------------------|
| **Upstream Regulators** | 268 genes, 572 chemicals   | 334 genes, 598 chemicals   |
| **Disease Associations** | 22 diseases               | 35 diseases                |

---

## Key Results

### Cyclosporin A (CsA)
1. **Differential Gene Expression**:
   - 1,492 DEGs identified at FDR 0.05.
2. **Top Pathways**:
   - Most significant: *Cell Cycle* (FDR = 2.788e-17).
3. **Upstream Regulators**:
   - 268 genes and 572 chemicals identified.

### Voclosporin (VOC)
1. **Differential Gene Expression**:
   - 489 DEGs identified at FDR 0.05.
2. **Top Pathways**:
   - Most significant: *Protein Processing in the ER* (FDR = 2.604e-16).
3. **Upstream Regulators**:
   - 334 genes and 598 chemicals identified.

---

## Highlights
1. **Voclosporin (VOC)**:
   - Targets specific pathways, particularly related to protein folding and cellular stress.
   - Unique organ- and cell-type-specific findings, including lung-related cell types.
2. **Cyclosporin A (CsA)**:
   - Broader systemic impacts with significant effects on the cell cycle and oocyte meiosis.

---

## Methods
1. **Data Sources**:
   - KEGG pathways, Gene Ontology, BioGRID, miRNA databases, and others.
2. **Analysis Techniques**:
   - Differential gene expression analysis with hypergeometric distribution.
   - Pathway impact analysis combining pORA and pAcc metrics.
   - GO term pruning for high specificity.
3. **Statistical Significance**:
   - Adjusted p-values via FDR and Bonferroni corrections.

---

## Visualizations
1. **Volcano Plots**: Highlight up- and down-regulated genes.
2. **Pathway Diagrams**: Show pathway perturbation and gene-level changes.
3. **Bar Plots**: Rank DEGs by log fold change.

---

---
## Tech Stack

### Frontend:
- **Next.js**: For dynamic, server-rendered pages and a robust React framework.
- **Tailwind CSS**: Utility-first styling framework.
- **shadcn/ui**: Prebuilt UI components.

### Backend:
- **Python**: For data analysis and processing.
- **Flask/FastAPI**: For serving data analysis APIs.
- **Pandas/NumPy**: For data manipulation.
- **Matplotlib/Plotly**: For generating visualizations programmatically.

### Data Storage:
- **Raw/Processed Data**:
  - Store raw data under `data/raw/` and processed versions in `data/processed/`.
  - Include metadata about datasets in `data/README.md`.

### Testing:
- **Pytest**: For backend and data processing tests.
- **Jest**: For testing frontend React components.

### Deployment:
- **Vercel**: For the frontend deployment.
- **AWS/Heroku/Render**: For the backend deployment.

---

## Key Features

### Data Analysis and Visualization:
- Use `notebooks/` for exploratory analysis and visualizations in Python.
- Dynamic charts rendered via `chart.tsx` in the frontend.

### API Integration:
- Serve processed data via Python APIs, like `pathway_enrichment.py`.

### Interactive Frontend:
- Tailored components for user interaction with dynamic pathway data.

### Data-Driven Testing:
- Include Python tests for APIs and data processing.

### Documentation:
- Clear guidelines in the `README.md` for developers and contributors.

---

## Repository Structure
```
project-root/
├── .git/                          # Git repository metadata
├── .next/                         # Next.js build output
├── .wrangler/                     # Cloudflare Wrangler configuration (if applicable)
│   └── state/
│       └── v3/
│           └── workflows/
├── app/                           # Application pages and layouts
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── api/                       # API routes for backend logic
│   │   └── data/
│   │       └── route.ts           # API route for data fetching
│   ├── context/                   # Global state and context
│   │   └── AppContext.tsx         # React Context for state management
│   ├── fonts/                     # Custom fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── favicon.ico                # Favicon for the app
│   ├── globals.css                # Global styles (Tailwind CSS)
│   ├── layout.tsx                 # App layout
│   ├── page.tsx                   # Landing page
│   └── providers.tsx              # React providers for context and theme
├── components/                    # Reusable UI components
│   ├── ui/                        # shadcn/ui components
│   │   ├── chart.tsx              # Component for rendering charts
│   │   ├── table.tsx              # Component for tabular data
│   │   └── tooltip.tsx
│   ├── Footer.tsx                 # Footer component
│   ├── Header.tsx                 # Header component
│   ├── MainContent.tsx            # Main content component
│   └── SidePanel.tsx              # Side panel for navigation or additional content
├── data/                          # Data files
│   ├── raw/                       # Raw datasets (e.g., CSV, JSON, Excel)
│   ├── processed/                 # Processed/cleaned datasets
│   ├── pathways.json              # Example pathway enrichment data
│   └── README.md                  # Documentation about the data
├── notebooks/                     # Jupyter notebooks for data exploration
│   ├── data_analysis.ipynb        # Notebook for initial data exploration
│   └── visualization.ipynb        # Notebook for generating visualizations
├── public/                        # Public folder for assets like images, icons, etc.
│   ├── graphs/                    # Static versions of graphs (e.g., PNG, SVG)
│   └── index.html                 # Base HTML file for React app
├── src/                           # Backend and utility scripts
│   ├── api/                       # APIs for data processing
│   │   └── pathway_enrichment.py  # API to process KEGG pathway enrichment
│   └── utils/                     # Utility functions for data handling
│       ├── data_loader.js         # Script to load and process data
│       └── chart_helpers.js       # Helper functions for rendering charts
├── tests/                         # Unit and integration tests
│   ├── test_data_analysis.py      # Python tests for data processing
│   ├── test_api_routes.py         # Tests for API routes
│   └── README.md                  # Testing guidelines
├── README.md                      # Documentation for the project
├── requirements.txt               # Python dependencies for backend
├── server.py                      # Flask/Django/FastAPI backend server
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

---

## Usage Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/aryehky/RNAlytics.git
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run analysis scripts:
   ```bash
   python scripts/analyze_pathways.py
   ```

---

## Authors
- **Kayenat Aryeh**: Lead Researcher and Data Analyst.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.


# Create and activate virtual environment
```
python -m venv rna_seq_env
source rna_seq_env/bin/activate 
```

# Install backend dependencies
```
pip install flask pandas numpy matplotlib plotly pytest fastapi uvicorn
pip install scikit-learn scipy statsmodels
pip freeze > requirements.txt
```

# Run the server
The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:8000
You'll need to add your actual data files to the data/raw directory
Create Jupyter notebooks in the notebooks directory for your analysis
Add your tests in the tests directory
Configure your deployment settings based on your chosen platforms (Vercel, AWS, etc.)
