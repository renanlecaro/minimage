# minimage
Minimal html5 image editor : https://minimage.tk

How it works :
- tap anywhere to load a file
- draw on it
- tap the colored background to change the drawing color
- tap download to download
- reload the page to start a new edit

I got tired of having no default app on my phone to draw on images. So I made a very, very simple one.

Feel free to do PRs to make it work better on your setup. It would be nice to have it work offline (i tried but just managed to prevent refreshes)

How to install

- git pull
- npm i

How to run locally (will transpile source to usable js and css)
- npm run transpile-css
- npm run transpile-js

How to build 
- npm run transpile-js-compress
- git push 



Credits :

How to draw on a canvas :
http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html

Get the original filename :
https://stackoverflow.com/questions/16710302/html5-file-api-with-filename-path

Download canvas as an image : 
http://jsfiddle.net/wboykinm/fL0q2uce/

Accept only images :
https://www.w3schools.com/tags/att_input_accept.asp

How to set the font stack to a not too dirty one 
http://www.cssfontstack.com/Arial

Pretty icons when added to home screen:
https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
