#/bin/bash

rm -f bl.ocks.firefox.xpi
zip bl.ocks.firefox.xpi chrome.manifest content/blocks.js content/blocks.xul install.rdf
