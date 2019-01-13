## spomanager

It is a web part built on SharePoint Framework to explore, manage SharePoint online resources. 

Version 1.0 features: 
The web part allows configuring which site to show, by default, it shows all sites in the tenant; 
The web part shows all available information of SharePoint online sites, webs, lists, views, fields, etc. (see more details below) 
 
Web part contains:  
header (command bar) 
tree view (left panel) 
properties panel (right panel) 
footer (status bar) 
Header contains commands, current version has no commands available. 
Tree view contains site collection and related components, like: 
Subwebs (including App Webs) 
List and libraries 
Site Columns 
Content Types 
Items and Field Values 
Views 
Features (activated) 
Site Users 
Site Groups 
Associated Visitor, Member and Owner groups 
Taxonomy (Term Store) 
User Profiles 
Workflows Templates 
Workflow Associations 
Event Receivers 
Properties 
List Templates 
Push Notifications 
Web Templates 
Role Assignments 
Role Definitions 
Recycle Bin (first and second stage) 
Root Folder including subfolders and files 
User Custom Actions 
Project Policies (Site Closure and Deletion) 
The tree view includes the hidden objects (shown in gray) next to the default objects  
 
Property panel 
Show tree node properties on property panel, property panel contains: 
"Properties"-tab shows all selected node properties (all tree nodes have this tab) 
"Raw Data"-tab shows the list items based on the columns of a list or library 
"Schema XML"-tab shows the schema XML for List, Content Type, Field and View 
 
Status bar shows selected node / object class status or extra information. 

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
