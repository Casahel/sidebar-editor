import { v4 as uuidv4 } from 'uuid';
import configFile from '../../public/data-test.json';
//const childMark = '┕ ';

// line 6 to be changed to a proper fetch when the app will be integrated with
// the rest of the Egret tool
const parsedConfig = JSON.parse(JSON.stringify(configFile));

for (const element of parsedConfig)
{
    element.id = uuidv4();
    if (element.children)
    {
        let parentId = element.id;
        for (const child of element.children)
        {
            child.id = uuidv4();
            child.parentId = parentId;
        }
    }
}

const tableData = [];

parsedConfig.forEach((entry) => {
    tableData.push(entry);
    if (entry.children)
    {
        entry.children.forEach((subentry) => {
            tableData.push(subentry);
        })
    }
})

export default tableData;

/* Object pattern:
    {
        "name": "",
        "path": "",
        "icon": "",
        "iconText": "",
        "env": "",
        "auth": "",
        "noAuth": ""
        "functionPermissions": "[]"
        "children": "[]"
    }
    */
