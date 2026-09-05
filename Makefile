.PHONY: html live check linkcheck

html:
	npm run build

live:
	npm run dev -- --host 127.0.0.1

check:
	npm test

linkcheck:
	npm run check:links
