
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
RNAlytics/
├── .git/
├── .github/
├── .wrangler/
│   └── state/
│   │   └── v3/
│   │   │   └── workflows/
├── app/
│   ├── analysis/
│   │   └── page.tsx
│   ├── api/
│   │   ├── chord/
│   │   │   └── route.ts
│   │   ├── deg-rankings/
│   │   │   └── route.ts
│   │   ├── differential-expression/
│   │   │   └── route.ts
│   │   └── pathway/
│   │   │   └── route.ts
│   ├── data/
│   │   └── page.tsx
│   ├── documentation/
│   │   └── page.tsx
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── utils/
│   │   ├── chart_helpers.js
│   │   └── data_loader.js
│   ├── visualizations/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── hover-card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   └── use-toast.ts
│   ├── visualizations/
│   │   ├── ChordDiagram.tsx
│   │   ├── DegRankings.tsx
│   │   ├── PathwayDiagram.tsx
│   │   ├── PlotControls.tsx
│   │   └── VolcanoPlot.tsx
│   ├── Card.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── MainContent.tsx
│   ├── ModeToggle.tsx
│   └── SidePanel.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.tsx
├── lib/
├── node_modules/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── logo.png
│   ├── logo2.png
│   ├── logo3.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── tests/
│   ├── README.md
│   ├── test_api_routes.py
│   └── test_data_analysis.py
├── .DS_Store
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .npmrc
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── requirements.txt
├── server.py
├── tailwind.config.ts
├── tsconfig.json
└── wrangler.toml           
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
