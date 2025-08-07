## Original Backup

with all the kmart files for the image downloads, this version seems to work

# creates

- individual product file (formatted from kmart bloat version)
- combines into all mens product file
- creates a sub cats file (to keep track of the files that have been written, I may use this for other purposes as well. Writing files seems to trigger a reload so I use this file to do a check for the file name \*(I can't use state, writing files is server side only))
- there's a product blurb file as well which I'm hard coding for each sub category

- currently renders the individual product file, images, price, if the product is clearance and blurb

## V1

- got rid of excess .json files (mens/womens ect I'm not using for now)
- downloaded/formatted all mens clothing (there are double ups)

## V2

- got all mens data
- Removed double ups out of allMens.json (still some in individual files)
- Need to redownload images :(
- page ORG = non kmart image version
- Foot wear accessories contains womens levels??
