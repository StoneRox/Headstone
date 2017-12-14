import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
const lazyComponentsPath = 'lazy-routed-components';
const sharedModulesPath = 'shared';
function enhanceModule(moduleObj: Object, props: Object) {
  Object.keys(props).forEach(key => {
    let value = props[key];
    if (value) {
      if (!moduleObj[key]) {
        moduleObj[key] = []
      }
      if (value.constructor === Array) {
        moduleObj[key] = moduleObj[key].concat(value)
      }
      else {
        moduleObj[key].push(value)
      }
    }
  });
}
function folderAndFileName(name){
    return name[0].toLowerCase() + name.slice(1);
}
async function LazyModules(componentName: string,imports?: any, declarations?: any, providers?: any) {

  //componentName = componentName.toLowerCase();
  const component = await import('../../' + lazyComponentsPath + '/' + folderAndFileName(componentName) + '/' + folderAndFileName(componentName) + '.component')
    .then(c => c[componentName[0].toUpperCase() + componentName.slice(1) + 'Component']);
  const routes: Routes = [{path: '', component}];
  let moduleObj = {
    imports: [RouterModule.forChild(routes)],
    declarations: [component]
  };
  if(declarations){
      if(declarations.constructor !== Array){
          declarations = [declarations]
      }
      for(let i = 0; i < declarations.length; i++) {
          let value = declarations[i];
          if(typeof value ==='string' && value.includes('Component')){
              value = value.replace('Component','');
              declarations[i] = await import('../../' + lazyComponentsPath + '/' + folderAndFileName(value) + '/' + folderAndFileName(value) + '.component').then(c => c[value[0].toUpperCase() + value.slice(1) + 'Component']);
          }

      }
  }
    if(imports){
        if(imports.constructor !== Array){
            imports = [imports]
        }
        for(let i = 0; i < imports.length; i++) {

            let value = imports[i];
            if(typeof value ==='string' && value.includes('Module')&&value.startsWith('Shared')){
                value = value.replace(/Shared|Module/g,'');
                imports[i] = await import('../' + sharedModulesPath + '/' + folderAndFileName(value) + '.shared.module').then(c =>{
                    return c['Shared'+value[0].toUpperCase() + value.slice(1) + 'Module']
                } );
            }
            if(value === 'FormsModule'){
                imports[i] = await import('@angular/forms').then(v=>v['FormsModule']);
            }
            if(value === 'ReactiveFormsModule'){
                imports[i] = await import('@angular/forms').then(v=>v['ReactiveFormsModule']);
            }
            if(value === 'CommonModule'){
                imports[i] =  await import('@angular/common').then(v=>v['CommonModule']);
            }
            if(value === 'Pipes'){
                imports[i] =  await import('../pipe/pipe.module').then(v=>v['PipeModule']);
            }
        }
    }
    else {
        let CommonModule:any = await import('@angular/common').then(v=>v['CommonModule']);
        moduleObj.imports.push(CommonModule)
    }

  enhanceModule(moduleObj,{declarations,imports,providers});

  @NgModule(moduleObj)
   class LazyModule {
  }

  return LazyModule
}
let lazyChild = (()=>{
    let generatedModules={};
    return function (name: string, imports?: any, declarations?: any, providers?: any) {
        return () => {
            if(!generatedModules[name]){
                generatedModules[name] = LazyModules(name, imports,declarations, providers);
            }
            return generatedModules[name];
        }
    }
})();
export default lazyChild;
