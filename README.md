# minimage
Minimal html5 image editor : https://minimage.lecaro.me/

<img src="http://i.imgur.com/1G5qGOo.png">


I got tired of having no default app on my phone to draw on images. So I made a very, very simple one.

Feel free to do PRs to make it work better on your setup. It would be nice to have it work offline (i tried but just managed to prevent refreshes)

How to install
- git pull
- npm i

How to run locally (will transpile source to usable js and css)
- npm start

The app is hosted on CF pages, and a bit outdated (webpack 3). 

How to publish changes
- npm run build
- git add . 
- git commit
- git push

I'll try to automate the build at some point
