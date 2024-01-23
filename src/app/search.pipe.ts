import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

   /* first argument - should be the item which have to be transformed
     second argument - based on which the transformation have to be done */

  transform(allemployee: any[], SearchKey: string): any[]{

    const result:any= []

    if(!allemployee || SearchKey===""){
      return allemployee
    }

    allemployee.forEach((item:any)=>{
      /* includes return boolean value */
      if(item.name.trim().toLowerCase().includes(SearchKey.trim().toLowerCase())){
        result.push(item)
      }
    })

    return result;
  }

}
