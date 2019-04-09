## spomanager

It is a web part built on SharePoint Framework to explore, manage SharePoint online resources. 

It will look lie this: <br/>
![screenshot](https://user-images.githubusercontent.com/1264810/55775385-b13df780-5acb-11e9-81fc-d156fc81b554.PNG)

Version 1.0 features: 
The web part allows configuring which site to show, by default, it shows all sites in the tenant; 
The web part shows all available information of SharePoint online sites, webs, lists, views, fields, etc. (see more details below) 
 


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
