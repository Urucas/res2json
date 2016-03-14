# res2json [![Build Status](https://travis-ci.org/Urucas/res2json.svg?branch=master)](https://travis-ci.org/Urucas/res2json)
Convert android string.xml resource to json

#Install
```bash
npm i --save res2json
```

#Usage
```javascript
import { parser } from 'res2json'
let resources = parser.parse(project_root, project_module, locale)
console.log(resources)
/*
{ app_name: 'Application name',
  activities: 'Acitivities',
  activity: 'Activity',
  new_activity: 'New Activity',
  save: 'Save',
  field: 'Field',
  labour: 'Labour',
  at: 'at',
  action_settings: 'Settings',
  write_date: '%d de %s, %d',
  add_product: 'Add Product',
  delete: 'Delete',
  months:
   [ 'January',
     'February',
     'March',
     'April',
     'May',
     'June',
     'July',
     'August',
     'September',
     'October',
     'November',
     'December' ] }
*/
// or directly using the path to the strings.xml
resources = parser.parseFile("./demo-project/app/src/main/res/values/strings.xml")
```