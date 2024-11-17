
# CsA-VOC-RNASeq-Analysis

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

## Repository Structure
- **data/**: Raw RNA-seq data and processed results.
- **scripts/**: Python and R scripts for analysis.
- **results/**: DEGs, pathway impacts, and visualizations.
- **docs/**: Methodology and reports.

---

## Usage Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/aryehky/CsA-VOC-RNASeq-Analysis.git
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
