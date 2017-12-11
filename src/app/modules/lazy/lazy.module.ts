import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
const lazyComponentsPath = 'lazy-routed-components';

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

export default async function LazyModules(componentName: string, declarations?: any, imports?: any, providers?: any) {
  //componentName = componentName.toLowerCase();
  const component = await import('../../' + lazyComponentsPath + '/' + componentName.toLowerCase() + '/' + componentName.toLowerCase() + '.component')
    .then(c => c[componentName[0].toUpperCase() + componentName.slice(1) + 'Component']);
  const routes: Routes = [{path: '', component}];
  let moduleObj = {
    imports: [ CommonModule,RouterModule.forChild(routes)],
    declarations: [component]
  };
  enhanceModule(moduleObj,{declarations,imports,providers});
  @NgModule(moduleObj)
  class LazyModule {
  }
  return LazyModule
}
