#!/bin/bash
rm *.log
rm *.toc
rm *.gz
rm *.pdf
rm *.ist
rm *.aux
rm *.blg
rm *.glg
rm *.glo
rm *.lof
rm *.lol
rm *.lot
rm *.tcp
rm *.gls
rm *.out
#rm CoreAsync-blx.bib #for Biblatex
#rm CoreAsync.bbl #for Biblatex
pdflatex CoreAsync
pdflatex CoreAsync
pdflatex CoreAsync
bibtex CoreAsync
makeglossaries CoreAsync
pdflatex CoreAsync
pdflatex CoreAsync
		
